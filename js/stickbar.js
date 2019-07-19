//置顶
var scrollPads = $("[data-bbtn]");
var i = 0;

var topBar = document.querySelector(".topNavBar");
var temOldElem;
var scrollTimeout = "";
window.addEventListener("scroll", function (e) {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {

        var scrollTop
        if (isMS()) {
            scrollTop = document.body.scrollTop;
        } else {
            scrollTop = document.documentElement.scrollTop;;
        }
        if (scrollTop > 90) {
            topBar.classList.add("graymask");

        } else {
            topBar.classList.remove("graymask");
        }


        if (scrollTop >= 400) {
            scrollPads[1].classList.remove("noShows");
            $(".progress").forEach(function (elem) {
                elem.style = `width:${elem.getAttribute("data-score")}%`
            })

        } else {
            scrollPads[1].classList.add("noShows");
            $(".progress").forEach(function (elem) {
                elem.style = `width:0%`
            })
        }

        i = scrollPads.length - 1;
        //激活对应点按钮
        while (i--) {

            if (scrollTop >= scrollPads[i + 1].offsetTop) {
                curMenuActived.classList.remove("actived");
                curMenuActived = $(`#${scrollPads[i+1].getAttribute("data-bbtn")}`, 1)
                curMenuActived.classList.add("actived");
                //scrollPads[i+1].classList.remove("noShows");
                break;
            }
            if (scrollTop >= scrollPads[i].offsetTop && scrollTop < scrollPads[i + 1]
                .offsetTop) {
                curMenuActived.classList.remove("actived");
                curMenuActived = $(`#${scrollPads[i].getAttribute("data-bbtn")}`, 1)
                curMenuActived.classList.add("actived");
                //scrollPads[i].classList.remove("noShows");
                break;
            } else {

            }
        }
        clearTimeout(scrollTimeout);
    }, 10)
});