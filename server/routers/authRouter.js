const AuthRouter = require("express").Router();
const AuthController = require("../controllers/authController");
const AuthMiddleware = require("../middleware/authMiddleware");
const {signInWithGoogle} = require("../auth/google");
const {signInWithVk} = require("../auth/vk");


AuthRouter.post("/login", AuthController.login)
AuthRouter.post("/register", AuthController.register)
AuthRouter.get("/me", [AuthMiddleware], AuthController.me)
AuthRouter.patch("/me", [AuthMiddleware], AuthController.updateUser)

AuthRouter.post('/google', signInWithGoogle);
AuthRouter.post('/vk', signInWithVk);

module.exports = AuthRouter;