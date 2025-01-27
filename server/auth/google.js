const {OAuth2Client} = require("google-auth-library");
const axios = require("axios");
const {User} = require("../db");
const AuthMiddleware = require("../middleware/authMiddleware");

const oAuth2Client = new OAuth2Client(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    'postmessage',
);

const getToken = async (code) => {
    const { tokens } = await oAuth2Client.getToken(code);
    return tokens
}

const getUserInfo = async (access_token) => {
    return await axios
        .get('https://www.googleapis.com/oauth2/v3/userinfo', {
            headers: {Authorization: `Bearer ${access_token}`},
        })
        .then(res => res.data);
}

const signInWithGoogle = async (req, res) => {

    let token = await getToken(req.body.code);

    let access_token = token.access_token;

    let user_info = await getUserInfo(access_token);
    console.log(req.headers)
    if (req.headers.authorization) {
        AuthMiddleware(req, res, () => {
            req.user.googleId = user_info.sub;
            req.user.save();
            res.status(200).json({
                user: req.user,
                success: true,
                token: req.user.generateToken()
            })
        })
    }
    else {
        let username = "google-" + user_info.sub;
        let candidate = await User.findOne({
            where: {
                googleId: user_info.sub
            }
        })
        if (candidate !== null) {
            candidate.googleId = user_info.sub;
            candidate.save();

            return res.status(200).json({
                success: true,
                token: candidate.generateToken(),
                user: candidate
            })
        }

        let family_name = user_info.name;
        let user = User.build({
            username,
            family_name,
            googleId: user_info.sub
        })
        user.setPassword(user_info.picture);
        await user.save();
        return res.status(200).json({
            success: true,
            token: user.generateToken(),
            user: user
        })
    }
}

module.exports = {
    getToken,
    getUserInfo,
    signInWithGoogle
}