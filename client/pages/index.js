import React, {useEffect, useState} from 'react';
import NavigationBar from "../components/NavigationBar";
import {isLoggedIn} from "../lib/user";
import {useRouter} from "next/router";


const Page = () => {
    let [user, setUser] = useState(false);
    let router = useRouter();
    useEffect(() => {
        isLoggedIn().then(r => {
            setUser(r);
        })
    }, []);



    return (
        <div>
            <NavigationBar user={user}/>
            {!!user ? <div style={{width: "100%"}}>
                <div style={{display: "table", margin: "0 auto", width: "75%"}}>
                    <h1>Ку, {user.family_name}</h1>
                </div>
            </div> : ""}

        </div>
    );
};

export default Page;