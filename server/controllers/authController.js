const AuthService = require("../services/authService")
const ResultToResponse = require("../utils/resultToResponse")

module.exports = new (class {
    register(req, res) {
        const {username, password} = req.body;

        AuthService.register(username, password).then(result => ResultToResponse(result, req, res))
    }
    login(req, res) {
        const {username, password} = req.body;

        AuthService.login(username, password).then(result => ResultToResponse(result, req, res))
    }
    me(req, res) {
        return res.json({
            user: req.user
        })
    }
    updateUser(req, res) {
        const {family_name} = req.body;

        AuthService.updateUser(req.user, family_name).then(result => ResultToResponse(result, req, res))
    }
})