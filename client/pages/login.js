import React, {useEffect, useState} from 'react';
import NavigationBar from "../components/NavigationBar";
import {isLoggedIn, login as loginF} from "../lib/user";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import {FloatingLabel, Row, Col} from "react-bootstrap";
import {setToken} from "../utils/tokenManager";
import {useRouter} from "next/router";
import Link from "next/link";
import {GoogleOAuthProvider, GoogleLogin, useGoogleLogin} from '@react-oauth/google';
import {SERVER_BASE_URL} from "../lib/config";
import {AXIOS as axios} from "../lib/config";
import {Auth} from "react-vk";
import {useUser} from "../hooks/useUser";
import { FaGoogle } from "react-icons/fa";
import {SiVk} from "react-icons/si"


const Page = () => {
    let user = useUser();
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [errorText, setErrorText] = useState("");

    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    let router = useRouter()

    const googleLogin = useGoogleLogin({
        onSuccess: async ({code}) => {
            let response = await axios.post('/auth/google', {
                code,
            });

            if (response.data.success) {
                setToken(response.data.token);
                await router.push("/")
            }
        },
        flow: 'auth-code',
    });

    const signin = async () => {
        let response = await loginF(login, password, false);

        if (!response.success) {
            setErrorText(response.message);
            setShowErrorModal(true);
        } else {
            setToken(response.token);
            router.push("/")
        }
    }

    return (
        // <div>
        //     <NavigationBar user={user}/>
        //     <div style={{width: "100%"}}>
        //         <div style={{display: "table", margin: "0 auto"}}>
        //             <Form>
        //                 <Form.Group className="mb-3">
        //                     <Form.Label>Имя пользователя</Form.Label>
        //                     <Form.Control value={login} onChange={event => setLogin(event.target.value)} type="text" placeholder="Имя пользователя" />
        //                 </Form.Group>
        //
        //                 <Form.Group className="mb-3">
        //                     <Form.Label>Пароль</Form.Label>
        //                     <Form.Control value={password} onChange={event => setPassword(event.target.value)} type="password" placeholder="Пароль" />
        //                 </Form.Group>
        //                 <Button variant="primary" className={"w-100"} onClick={signin}>
        //                     Войти
        //                 </Button>
        //
        //                 <br/>
        //                 <Link href={"/register"}><a>Нет аккуанта? Регистрация.</a></Link>
        //             </Form>
        //         </div>
        //     </div>
        //
        //
        // </div>
        <div className={"login-page"}>
            <Form className={"login-form"}>
                <h2 className={"login-headtext"}>Вход</h2>
                <p className={"login-p"}>Войдите в систему хз зачем покачану</p>
                <FloatingLabel
                    controlId="floatingInput"
                    label="Логин"
                    className="mb-3"
                >
                    <Form.Control type="text" placeholder={"Логин"}/>
                </FloatingLabel>
                <FloatingLabel controlId="floatingPassword2" label="Пароль">
                    <Form.Control type="password" placeholder={"Пароль"}/>
                </FloatingLabel>

                <Button variant="primary" className={"mt-3 w-100"} onClick={signin} size={"lg"}>
                    Войти
                </Button>
                <hr className={"login-hr"}/>

                <Row>
                    <Col>
                        <Button variant="primary" className={"w-100"} onClick={() => {
                            VK.Auth.login(async data => {
                                let response = await axios.post('/auth/vk', {
                                    info: data.session.user
                                });

                                if (response.data.success) {
                                    setToken(response.data.token);
                                    await router.push("/")
                                }
                            })
                        }}>
                            <SiVk/>
                        </Button>
                    </Col>
                    <Col>
                        <Button variant="primary" className={"w-100"} onClick={googleLogin}>
                            <FaGoogle/>

                        </Button>
                    </Col>
                </Row>
            </Form>

            <Modal
                show={showErrorModal}
                onHide={() => setShowErrorModal(false)}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Ошибка</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {errorText}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={() => setShowErrorModal(false)}>
                        Закрыть
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};


// <Button variant="secondary" className={"w-100 mt-2"} onClick={googleLogin}>
//     Войти через Google
// </Button>
//

export default Page;