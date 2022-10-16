import {useEffect, useState} from "react";
import {isLoggedIn} from "../lib/user";

export const useUser = () => {
    let [user, setUser] = useState(false);

    useEffect(() => {
        isLoggedIn().then(r => {
            setUser(r);
        })
    }, []);

    return user;
}