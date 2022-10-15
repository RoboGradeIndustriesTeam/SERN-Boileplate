const TodoRouter = require("express").Router();
const TodoController = require("../controllers/todoController")
const AuthMiddleware = require("../middleware/authMiddleware")

TodoRouter.use(AuthMiddleware);

TodoRouter.get("/", TodoController.getTodos)
TodoRouter.post("/", TodoController.createTodo)
TodoRouter.post("/:id/complete", TodoController.completeTodo)
TodoRouter.delete("/:id", TodoController.deleteTodo)

module.exports = TodoRouter;