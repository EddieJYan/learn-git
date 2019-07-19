var curMenuActived = $(".topNavBar>nav>ul>li>a", 1);
//锚点与滚动位置关联
function createScrollAnchor() {
    $(".topNavBar>nav>ul>li>a").forEach(function (elem) {

        if (elem.getAttribute("href") && elem.getAttribute("href").indexOf("#") != -1) {
            elem.setAttribute("data-scrollTop", ($(elem.getAttribute("href"), 1).offsetTop + 100));

            //点击滚动锚点处事件加载
            elem.onclick = function (e) {
                e.preventDefault();
                //菜单按钮激活
                curMenuActived.classList.remove("actived");
                curMenuActived = e.currentTarget;
                curMenuActived.classList.add("actived");

                scrollAnimate(e.currentTarget.getAttribute("data-scrollTop"));
            }
        }
    })
}

createScrollAnchor();
let setInterId = "";
//点击后滚动到对应位置点动画
function scrollAnimate(top) {
    let n = 25; //滚动几次  可以理解为动画帧数
    let dur = 300 / n; //多少秒动一次， 可以理解为动画每一帧的速度


    let curTop; //当前已经滚动点高度 也有用window.scrollY 但兼容不是很好
    if (isMS()) {
        curTop = document.body.scrollTop;
    } else {
        curTop = document.documentElement.scrollTop;
    }
    let distance = (top - curTop) / n; //
    let i = 0;

    clearInterval(setInterId);
    document.body.style = "opacity:0.3";
    setInterId = setInterval(() => {
        i++;
        if (i > n) {
            window.scrollTo(0, top);
            document.body.style = "opacity:1";
            clearInterval(setInterId);
            return;
        }
        window.scrollTo(0, curTop + distance * i);
        dur -= 100;
    }, dur)
}