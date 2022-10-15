const AuthService = require("../services/authService");
const ResultToResponse = require("../utils/resultToResponse");
module.exports = (req, res, next) => {
    if (!req.headers.authorization) {
        return ResultToResponse({
            success: false,
            message: 'Нет хедера Authorization'
        }, req, res)
    }
    const token = req.headers.authorization.split(" ")[1];

    AuthService.me(token).then(result => {
        if (!result.success) return ResultToResponse(result, req, res)
        req.user = result.user;
        req.user_id = result.user.id;
        req.token = token;
        req.user_response = result;
        next();
    })
}