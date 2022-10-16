import React, {useEffect, useState} from 'react';
import NavigationBar from "../components/NavigationBar";
import {updateUser} from "../lib/user";
import {useRouter} from "next/router";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {getToken} from "../utils/tokenManager";
import {useUser} from "../hooks/useUser";


const Page = () => {
    let user = useUser();
    let [displayName, setDisplayName] = useState("");
    let router = useRouter();

    useEffect(() => {
        if (!!user) setDisplayName(user.family_name)
    }, [user]);



    return (
        <div>
            <NavigationBar/>
            {!!user ? <div style={{width: "100%"}}>
                <div style={{display: "table", margin: "0 auto"}}>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Имя пользователя</Form.Label>
                            <Form.Control value={user.username} readOnly={true} disabled={true} type="text" placeholder="Имя пользователя" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Имя</Form.Label>
                            <Form.Control value={displayName} onChange={event => setDisplayName(event.target.value)} type="text" placeholder="Имя" />
                        </Form.Group>
                        <Form.Group className="mb-3 w-100">
                            <Button variant={"primary"} className={"w-100"} onClick={() => {
                                updateUser(getToken(), displayName).then(r => {
                                    router.reload()
                                })
                            }}>Сохранить</Button>
                        </Form.Group>
                        <Form.Group className="mb-3 w-100">
                            <Button variant={"danger"} className={"w-100"} onClick={() => {
                                localStorage.clear()
                                router.push("/");
                            }}>Выйти</Button>
                        </Form.Group>
                    </Form>
                </div>
            </div> : ""}
        </div>
    );
};

export default Page;