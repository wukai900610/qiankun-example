export default {
    setLocalData(key, value){
        window.localStorage.setItem(key, window.JSON.stringify(value))
    },
    getLocalData(key){
        return window.JSON.parse(window.localStorage.getItem(key))
    },
    removeLocalData(key){
        window.localStorage.removeItem(key)
    },
    setSessionData(key, value){
        window.sessionStorage.setItem(key, window.JSON.stringify(value))
    },
    getSessionData(key){
        return window.JSON.parse(window.sessionStorage.getItem(key))
    },
    removeSessionData(key){
        window.sessionStorage.removeItem(key)
    },
    cloneObj(obj){
        return JSON.parse(JSON.stringify(obj))
    }
}
