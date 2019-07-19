function isMS() {
    if (!!window.ActiveXObject || "ActiveXObject" in window) {
        return true;
    } else {

        if (/Edge/.test(navigator.userAgent)) {
            return true
        }
        return false;
    }
}
if(isMS()){
    alert("建议使用chrome或firefox浏览器打开！")
}
