const {User} = require("../db/index")

module.exports = new (class {
    async register(username, password) {
        const candidate = await User.findOne(
            {
                where: {
                    username
                }
            }
        );

        console.log(candidate)

        if (candidate === null) {
            let user = User.build({
                username,
                family_name: username
            });
            user.setPassword(password);
            await user.save();
            return {
                success: true,
                user,
                token: user.generateToken()
            }
        }
        else {
            return {
                success: false,
                message: "Пользователь с таким логином уже существует"
            }
        }
    }
    async login(username, password) {
        const candidate = await User.findOne({
            where: {username}
        })

        if (candidate === null) {
            return {
                success: false,
                message: "Не верный логин или пароль"
            }
        }
        else {
            if (candidate.comparePassword(password)) {
                return {
                    success: true,
                    token: candidate.generateToken(),
                    user: candidate
                }
            }
            else {
                return {
                    success: false,
                    message: "Не верный логин или пароль"
                }
            }
        }
    }
    async me(token) {
        if (token === undefined || token === "undefined") return {
            success: false,
            message: "Не верный токен"
        }

        let candidate = await User.findByToken(token);

        if (candidate === null) {
            return {
                success: false,
                message: "Не верный токен"
            }
        }
        else {
            return {
                success: true,
                user: candidate
            }
        }
    }
})