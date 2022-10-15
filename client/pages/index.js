import React, {useEffect, useState} from 'react';
import NavigationBar from "../components/NavigationBar";
import {isLoggedIn} from "../lib/user";
import {completeTodo, createTodo, deleteTodo, getTodos} from "../lib/todo";
import {getToken} from "../utils/tokenManager";
import Form from "react-bootstrap/Form"
import {CloseButton} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {useRouter} from "next/router";

const Todo = ({todo, setTodos}) => {
    return (
        <div className={"d-flex align-items-center"} style={{
            borderStyle: "solid",
            borderRadius: 10,
            margin: 10,
            padding: 5,
        }}>
            <Form.Check
                type={"radio"}
                checked={todo.completed}
                readOnly={true}
                onClick={event => {
                    event.preventDefault()
                    completeTodo(getToken(), todo.id).then(r => {
                        if (r.success) {
                            getTodos(getToken()).then(rr => {
                                setTodos(rr.todos)
                            })
                        }
                        else {
                            alert(r.message);
                        }
                    })
                }}
            />
            <CloseButton onClick={() => {
                deleteTodo(getToken(), todo.id).then(r => {
                    if (r.success) {
                        getTodos(getToken()).then(rr => {
                           setTodos(rr.todos)
                        })
                    }
                    else {
                        alert(r.message);
                    }
                })
            }}/>
            <h1 style={{marginLeft: 15}}>{todo.text}</h1>
        </div>
    );
};


const TodoList = ({user, token}) => {
    let [todos, setTodos] = useState([])
    let [newText, setNewText] = useState("")

    useEffect(() => {
        let token = getToken();
        getTodos(token).then(r => {
            console.log(`Loaded ${r.todos.length} todos`)
            setTodos(r.todos)
        })
    }, [])

    return (
        <div className={"w-100"}>
            <div className={"d-flex align-items-center"} style={{
                borderStyle: "solid",
                borderRadius: 10,
                margin: 10,
                padding: 5,
            }}>
                <Form.Control type={'text'} value={newText} onChange={event => {
                    setNewText(event.target.value)
                }} placeholder={"Текст задачи"}/>
                <Button variant={"success"} style={{marginLeft: 10}} onClick={() => {
                    createTodo(getToken(), newText).then(r => {
                        console.log(r)
                        if (r.success) {
                            getTodos(getToken()).then(rr => {
                                setTodos(rr.todos)
                            })
                        }
                        else {
                            alert(r.message);
                        }
                    })
                }}>Добавить</Button>
            </div>
            {[].concat(todos).reverse().map(r => <Todo todo={r} key={r.id} setTodos={setTodos}/>)}

        </div>
    );
};

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
    }, []);



    return (
        <div>
            <NavigationBar user={user}/>
            {!!user ? <div style={{width: "100%"}}>
                <div style={{display: "table", margin: "0 auto", width: "75%"}}>
                    <TodoList user={user}/>
                </div>
            </div> : ""}

        </div>
    );
};

export default Page;