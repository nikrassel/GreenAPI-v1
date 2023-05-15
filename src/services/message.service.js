import axios from "axios"
import localStorageService from "./localStorage.service"

const idInstance = localStorageService.getIdInstance()
const apiTokenInstance = localStorageService.getApiTokenInstance()
const sendEndpoint = `https://api.green-api.com/waInstance${idInstance}/sendMessage/${apiTokenInstance}`
const reciveEndpoint = `https://api.green-api.com/waInstance${idInstance}/ReceiveNotification/${apiTokenInstance}`

const MessageService = {
    post: async (payload, headers) => {
        try {
            const data = await axios.post(sendEndpoint, payload, headers)
            return data
        } catch (error) {
            console.log(error)
        }
    },
    get: async () => {
        try {
            const data = await axios.get(reciveEndpoint, {}, {})
            return data
        } catch (error) {
            console.log(error)
        }
        
    },
    delete: async (receiptId) => {
        const deleteEndpoint = `https://api.green-api.com/waInstance${idInstance}/deleteNotification/${apiTokenInstance}/${receiptId}`
        try {
            const data = await axios.delete(deleteEndpoint, {}, {})
            return data
        } catch (error) {
            console.log(error)
        }
    }
}

export default MessageService
