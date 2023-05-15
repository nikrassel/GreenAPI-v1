const IDINST_KEY = "idInstance"
const APITOKEN_KEY = "apiTokenInstance"

export function setInstances (idInstance, apiTokenInstance) {
    localStorage.setItem(IDINST_KEY, idInstance)
    localStorage.setItem(APITOKEN_KEY, apiTokenInstance)
}
export function getIdInstance() {
    return localStorage.getItem(IDINST_KEY)
}
export function getApiTokenInstance() {
    return localStorage.getItem(APITOKEN_KEY)
}
export function removeInstanceData() {
    localStorage.removeItem(IDINST_KEY)
    localStorage.removeItem(APITOKEN_KEY)
}

const localStorageService = {
    setInstances,
    getIdInstance,
    getApiTokenInstance,
    removeInstanceData
}
export default localStorageService
