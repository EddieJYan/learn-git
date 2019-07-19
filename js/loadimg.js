
var $ = (str, t) => t ? document.querySelector(str) : document.querySelectorAll(str);
var allImg = $("img");
var msgDom = $("#loadmsg", 1);
var imgCount = allImg.length;
var addLoadMsg = (str, color = "black") => msgDom.innerHTML += `<p style="color:${color}">${str}</p>`;


function closeLoad() {
    document.body.style = "";
    $("#mask", 1).style = "display:none;";
    animiatiShow("main");
    animiatiShow(".topNavBar");
}

$("img").forEach(elem => {
    elem.addEventListener("load", function (e) {
        addLoadMsg(e.target.src + "  completed!");
        imgCount--;
        if (imgCount <= 1) {
            setTimeout(function () {
                closeLoad();
            }, 1200)
        }
    })
    elem.addEventListener("error", function (e) {
        addLoadMsg(e.target.src + "  error!", "red");
        imgCount--;
        if (imgCount <= 1) {
            setTimeout(function () {
                closeLoad();
            }, 1200)
        }
    })
});

//超时显示
setTimeout(function () {
    if (!($("#mask", 1).hasAttribute("style"))) {
        closeLoad();
    }
}, 4000);

function animiatiShow(emStr) {
    $(emStr, 1).classList.remove("noShow");
}