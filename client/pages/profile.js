import React, {useEffect, useState} from 'react';
import NavigationBar from "../components/NavigationBar";
import {isLoggedIn} from "../lib/user";
import {useRouter} from "next/router";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";


const Page = () => {
    let [user, setUser] = useState(false);
    let router = useRouter();

    useEffect(() => {
        isLoggedIn().then(r => {
            if (!r) {
                router.push("/login")
            }
            setUser(r);
        })
    }, [router]);



    return (
        <div>
            <NavigationBar user={user}/>
            {!!user ? <div style={{width: "100%"}}>
                <div style={{display: "table", margin: "0 auto"}}>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Имя пользователя</Form.Label>
                            <Form.Control value={user.username} readOnly={true} disabled={true} type="text" placeholder="Имя пользователя" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Имя</Form.Label>
                            <Form.Control value={user.family_name} readOnly={true} disabled={true} type="text" placeholder="Имя" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Button variant={"danger"} onClick={() => {
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