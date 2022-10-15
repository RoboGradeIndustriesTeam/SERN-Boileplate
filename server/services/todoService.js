const {Todo} = require("../db/index");

module.exports = new (class {
    async createTodo(user, text) {
        let todo = Todo.build({author: user.id, text, completed: false})

        await todo.save()
        return {
            success: true,
            todo
        }
    }
    async getTodos(user) {
        let todos = await Todo.findAll({
            where: {
                author: user.id
            }
        });

        return {
            success: true,
            todos
        }
    }
    async completeTodo(user, todo_id) {
        let todo = await Todo.findByPk(todo_id)

        if (todo === null) {
            return {
                success: false,
                status: 404,
                message: "Задача не найдена"
            }
        }

        if (todo.author !== user.id) {
            return {
                success: false,
                status: 401,
                message: "Задача не пренадлежит вам"
            }
        }

        todo.completed = !todo.completed;
        await todo.save();
        return {
            success: true,
            todo
        }
    }
    async deleteTodo(user, todo_id) {
        let todo = await Todo.findByPk(todo_id)

        if (todo === null) {
            return {
                success: false,
                status: 404,
                message: "Задача не найдена"
            }
        }

        if (todo.author !== user.id) {
            return {
                success: false,
                status: 401,
                message: "Задача не пренадлежит вам"
            }
        }

        await todo.destroy()

        return {
            success: true,
        }
    }
})