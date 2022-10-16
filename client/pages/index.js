import React, {useEffect, useState} from 'react';
import NavigationBar from "../components/NavigationBar";
import {useUser} from "../hooks/useUser";


const Page = () => {
    let user = useUser();

    return (
        <div>
            <NavigationBar/>
            {!!user ? <div style={{width: "100%"}}>
                <div style={{display: "table", margin: "0 auto", width: "75%"}}>
                    <h1>Ку, {user.family_name}</h1>
                </div>
            </div> : ""}

        </div>
    );
};

export default Page;