const AuthRouter = require("express").Router();
const AuthController = require("../controllers/authController");
const AuthMiddleware = require("../middleware/authMiddleware");

AuthRouter.post("/login", AuthController.login)
AuthRouter.post("/register", AuthController.register)
AuthRouter.get("/me", [AuthMiddleware], AuthController.me)

module.exports = AuthRouter;