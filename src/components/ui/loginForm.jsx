import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import TextField from "../common/form/textField"
import { validator } from "../../utils/validator"
import localStorageService from "../../services/localStorage.service"

const LoginForm = () => {
    const [data, setData] = useState({ idInstance: "", apiTokenInstance: "" })
    const navigate = useNavigate()
    const [errors, setErrors] = useState({})
    const validatorConfig = {
        idInstance: {
            isRequired: {
                message: "Поле обязательно для заполнения"
            }
        },
        apiTokenInstance: {
            isRequired: {
                message: "Поле обязательно для заполнения"
            }
        }
    }
    function handleChange({ name, newValue }) {
        setData((prevState) => ({
            ...prevState,
            [name]: newValue
        }))
    }
    function handleSubmit(event) {
        event.preventDefault()
        const isValid = validate()
        if (!isValid) return
        localStorageService.setInstances(data.idInstance, data.apiTokenInstance)
        navigate("/chat")
    }
    useEffect(() => {
        validate()
    }, [data])
    const validate = () => {
        const errors = validator(data, validatorConfig)
        setErrors(errors)
        return Object.keys(errors).length === 0
    }
    const buttonActive = Object.keys(errors).length === 0
    return (
        <form onSubmit={handleSubmit}>
            <TextField
                label="idInstance"
                type="password"
                name="idInstance"
                value={data.idInstance}
                onChange={handleChange}
                error={errors.idInstance}
            ></TextField>
            <TextField
                label="apiTokenInstance"
                type="password"
                name="apiTokenInstance"
                value={data.apiTokenInstance}
                onChange={handleChange}
                error={errors.apiTokenInstance}
            ></TextField>
            <button
                disabled={!buttonActive}
                className="btn btn-primary w-100 mx-auto"
            >
                Submit
            </button>
        </form>
    )
}

export default LoginForm
