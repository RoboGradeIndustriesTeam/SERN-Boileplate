import {AXIOS as axios} from "./config";

export const getTodos = async (token) => {
    try {
        let response = await axios.get("/todo", {
            headers: {
                authorization: `Bearer ${token}`
            }
        });

        return response.data;
    }
    catch (err) {
        if (err.response) {
            return err.response.data;
        }
        else {
            return {
                success: false,
                message: "Ошибка на стороне клиента"
            }
        }
    }
}
export const createTodo = async (token, text) => {
    try {
        let response = await axios.post("/todo", {
            text
        }, {
            headers: {
                authorization: `Bearer ${token}`
            }
        });

        return response.data;
    }
    catch (err) {
        if (err.response) {
            return err.response.data;
        }
        else {
            return {
                success: false,
                message: "Ошибка на стороне клиента"
            }
        }
    }
}
export const completeTodo = async (token, todo_id) => {
    try {
        let response = await axios.post(`/todo/${todo_id}/complete`, {}, {
            headers: {
                authorization: `Bearer ${token}`
            }
        });

        return response.data;
    }
    catch (err) {
        if (err.response) {
            return err.response.data;
        }
        else {
            return {
                success: false,
                message: "Ошибка на стороне клиента"
            }
        }
    }
}
export const deleteTodo = async (token, todo_id) => {
    try {
        let response = await axios.delete(`/todo/${todo_id}`,{
            headers: {
                authorization: `Bearer ${token}`
            }
        });

        return response.data;
    }
    catch (err) {
        if (err.response) {
            return err.response.data;
        }
        else {
            return {
                success: false,
                message: "Ошибка на стороне клиента"
            }
        }
    }
}