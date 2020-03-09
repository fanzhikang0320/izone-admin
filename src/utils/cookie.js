
/**
 * 设置cookie
 * @param {*} key 
 * @param {*} value 
 * @param {*} time 
 */
function setCookie(key,value,time) {
    var day = time;
    var date = new Date();
    date.setTime(date.getTime() + day * 24 * 60 * 60 * 1000);
    document.cookie = `${key}=${escape(value)};expires=${date.tpGMTString()}`;
}
/**
 * 获取cookie
 * @param {*} key 
 */
function getCookie(key) {
    var arr = document.cookie.match(new RegExp("(^|)" + key + "=([^;]*)(;|$)"));
    if (arr != null) {
        return unescape(arr[2]);
    }
    return null
}
/**
 * 删除cookie
 * @param {*} key 
 */
function deleteCookie(key) {
    var date = new Date();
    date.setTime(date.getTime() - 1)
    var value = getCookie(key);
    if (value != null) {
        document.cookie = key + '=' + value + ';expires=' + date.toGMTString();
    }
}

module.exports = {
    setCookie,
    getCookie,
    deleteCookie
}