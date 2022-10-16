import React, {useState} from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Link from "next/link";
import {useUser} from "../hooks/useUser";

const NavigationBar = () => {
    let user = useUser();

    return (
        <Navbar bg="light" expand="lg" sticky={"top"}>
            <Container>
                <Navbar.Brand href="/">FUCKATHON</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/">Главная</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text>
                        {!!user ? <>
                            Вы вошли как: <Link href="/profile"><a>{user.family_name}</a></Link>
                        </> : <Link href={"/login"}><a>Войти</a></Link>}

                    </Navbar.Text>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavigationBar;