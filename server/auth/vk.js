const {User} = require("../db");
const AuthMiddleware = require("../middleware/authMiddleware")

const signInWithVk = async (req, res) => {
    let user_info = req.body.info;

    if (req.headers.authorization) {
        AuthMiddleware(req, res, () => {

        })
    }
    else {
        let username = "vk-" + user_info.uid;
        let candidate = await User.findOne({
            where: {
                username
            }
        })
        if (candidate !== null) {
            return res.status(200).json({
                success: true,
                token: candidate.generateToken(),
                user: candidate
            })
        }

        let family_name = user_info.first_name + " " + user_info.last_name;
        let user = User.build({
            username,
            family_name,
            socialAuth: "vk",
            socialId: user_info.uid
        })
        user.setPassword(user_info.photo);
        await user.save();
        return res.status(200).json({
            success: true,
            token: user.generateToken(),
            user: user
        })
    }


}

module.exports = {
    signInWithVk
}