import {AXIOS as axios} from "./config";
import {getToken, setToken} from "../utils/tokenManager";

export const register = async (username, password, autologin) => {
    if (!autologin) {
        autologin = true;
    }

    try {
        let response = await axios.post("/auth/register", {
            username,
            password
        });

        if (autologin) {
            setToken(response.data.token);
        }

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
export const login = async (username, password, autologin) => {
    if (!autologin) {
        autologin = true;
    }

    try {
        let response = await axios.post("/auth/login", {
            username,
            password
        });

        if (autologin) {
            setToken(response.data.token);
        }

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
export const me = async (token) => {
    try {
        let response = await axios.get("/auth/me", {
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
export const updateUser = async (token, family_name) => {
    try {
        let response = await axios.patch("/auth/me", {
            family_name
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


export const isLoggedIn = async () => {
    let token = getToken()
    if (!token) return false;

    let user = await me(token);
    console.log(user)

    if (user.success === false) return false;

    return user.user;
}