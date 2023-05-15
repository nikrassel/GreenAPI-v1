import React, { useState } from "react"
import MessageService from "../../../services/message.service"
import Message from "../message/message"
import localStorageService from "../../../services/localStorage.service"
import { useNavigate } from "react-router-dom"

const TestGreen = () => {
    const [payloadData, setData] = useState({ chatId: "7", message: ""})
    const [chat, setChat] = useState({})
    const navigate = useNavigate()
    function startNewChat() {
        setChat({})
        getRequest()
    }
    const sendRequest = async() => {
        const payload = {
            "chatId": `${payloadData.chatId}@c.us`,
            "message": payloadData.message
        }
        const headers = {
            "Content-Type": "application/json"
            }
        const response = await MessageService.post(payload, headers)
        if (response && response.status === 200) {
            const newMessage = {
                name: "user",
                message: payloadData.message
            }
            setChat((prevState) => ({
                ...prevState,
                [response.data.idMessage]: {
                    ...newMessage
                }
            }))
        }
        setData((prevState) => ({
            ...prevState,
            message: ""
        }))
    }
    const getRequest = async() => {
        const response = await MessageService.get()
        if (response) {
            if (response.data) {
                console.log(response.data.body.typeWebhook)
                if (response.data.body.typeWebhook === "incomingMessageReceived") {
                    if (response.data.body.messageData.typeMessage === "textMessage" && 
                    response.data.body.senderData.chatId === `${payloadData.chatId}@c.us`) {
                        const newMessage = {
                            name: payloadData.chatId,
                            message: response.data.body.messageData.textMessageData.textMessage
                        }
                        setChat((prevState) => ({
                            ...prevState,
                            [response.data.body.idMessage]: {
                                ...newMessage
                            }
                        }))
                    }
            }
            await MessageService.delete(response.data.receiptId)
            }
            getRequest()
        } else {
            alert("Что-то пошло не так, попробуйте обновить страницу")
        }
    }
    function handleChange({ target }) {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }))
    }
    function handleLogOut() {
        localStorageService.removeInstanceData()
        navigate("/")
        window.location.reload()
    }
    function handleEnter(event) {
        if (event.code === "Enter" || event.code === "NumpadEnter") {
            sendRequest()
        }
    }
    return ( 
        <>
        <div className="container">
            <div className="row gutters-sm">
                <div className="col-md-4 mb-3 border border-success" style={{ height: "800px" }}>
                    <p>Введите номер телефона собеседника</p>
                    <input 
                        type="text" 
                        className="form-control m-2"  
                        name="chatId"
                        value={payloadData.chatId}
                        onChange={handleChange}
                        />
                    <button type="button" className="btn btn-success mb-2" onClick={startNewChat}>Начать новый чат</button>
                    <br />
                    <button type="button" className="btn btn-success" onClick={handleLogOut}>Завершить работу</button>
                </div>
                <div className="col-md-8 align-self-end">
                    <div>
                        {chat &&
                            Object.keys(chat).map((key) => (
                                <Message payload={chat[key]} key={key}/>
                            ))
                        }
                    </div>
                    <div className="container">
                        <div className="input-group mb-4">
                            <input 
                                type="text" 
                                className="form-control"  
                                aria-describedby="button-addon2"
                                placeholder="Введите сообщение" 
                                name="message"
                                value={payloadData.message}
                                onChange={handleChange}
                                onKeyDown={handleEnter}/>
                            <button className="btn btn-success" type="button" id="button-addon2" onClick={sendRequest}><i className="bi bi-send-fill"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </> 
    )
}
 
export default TestGreen
