import React from "react"
import LoginForm from "../ui/loginForm"

const Login = () => {
    return (
        <div className="container mt-3">
            <h3 className="mb-4">Добро пожаловать в сервис отправки сообщений с помощью Green Api</h3>
            <h3 className="mb-4">Вам необходимо авторизировать с помощью idInstance, apiTokenInstance вашего аккаунта GREEN-API</h3>
            <div className="row">
                <div className="col-md-6 offset-md-3 p-4">
                    <LoginForm />
                    <p>Еще нет аккаунта?</p>
                    <a role="button" href="https://green-api.com/">
                        Создать
                    </a>
                </div>
            </div>
        </div>
    )
}

export default Login
