const {Todo, User} = require("../db/index");
const ResultToResponse = require("../utils/resultToResponse");
const TodoService = require("../services/todoService");

module.exports = new (class {
    createTodo(req, res) {
        let {text} = req.body;

        if (!text) {
            return res.status(400).json({
                success: false,
                message: "Не указан text в body"
            })
        }

        TodoService.createTodo(req.user, text).then(r => ResultToResponse(r, req, res))
    }

    getTodos(req, res) {
        TodoService.getTodos(req.user).then(r => ResultToResponse(r, req, res))
    }

    completeTodo(req, res) {
        TodoService.completeTodo(req.user, parseInt(req.params.id)).then(r => ResultToResponse(r, req, res))

    }

    deleteTodo(req, res) {
        TodoService.deleteTodo(req.user, parseInt(req.params.id)).then(r => ResultToResponse(r, req, res))

    }
})