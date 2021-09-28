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
    setCookie(name, value, Hours){
        if (Hours == null || Hours == '') {
            Hours = 0.5
        }
        var exp = new Date()
        exp.setTime(exp.getTime() + Hours * 60 * 60 * 1000)
        document.cookie = name + '=' + escape(window.JSON.stringify(value)) + '; path=/;expires=' + exp.toGMTString()
    },
    getCookie(name){
        var arr
        var reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
        if (arr == document.cookie.match(reg)) {
            return window.JSON.parse(unescape(arr[2]))
        } else {
            return null
        }
    },
    removeCookie(name){
        var exp = new Date()
        exp.setTime(exp.getTime() - 1)
        var cval = util.getCookie(name)
        if (cval != null) { document.cookie = name + '=' + cval + '; path=/;expires=' + exp.toGMTString() }
    },
    cloneObj(obj){
        return JSON.parse(JSON.stringify(obj))
    }
}
