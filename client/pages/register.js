import React, {useEffect, useState} from 'react';
import NavigationBar from "../components/NavigationBar";
import {isLoggedIn, register as registerF} from "../lib/user";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import {setToken} from "../utils/tokenManager";
import {useRouter} from "next/router";
import Link from "next/link";



const Page = () => {
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [errorText, setErrorText] = useState("");

    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    let router = useRouter()

    const signup = async () => {
        let response = await registerF(login, password, false);

        if (!response.success) {
            setErrorText(response.message);
            setShowErrorModal(true);
        }
        else {
            setToken(response.token);
            router.push("/")
        }
    }

    return (
        <div>
            <NavigationBar/>
            <div style={{width: "100%"}}>
                <div style={{display: "table", margin: "0 auto"}}>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Имя пользователя</Form.Label>
                            <Form.Control value={login} onChange={event => setLogin(event.target.value)} type="text" placeholder="Имя пользователя" />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Пароль</Form.Label>
                            <Form.Control value={password} onChange={event => setPassword(event.target.value)} type="password" placeholder="Пароль" />
                        </Form.Group>
                        <Button variant="primary" className={"w-100"} onClick={signup}>
                            Регистрация
                        </Button>
                        <Link href={"/register"}><a>Есть аккуант? Войти.</a></Link>
                    </Form>
                </div>
            </div>

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

export default Page;