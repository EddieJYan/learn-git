        //作品集轮播
        var iw = document.querySelector("#slide-box").clientWidth;
        var newStyle = document.createElement("style");
        var slideWin = document.querySelector(".slide-window");



        var i = 0;
        var str = "";
        document.querySelectorAll(".slide-window>a").forEach((elem) => {
            elem.style = `width:${iw}px`;
            str += `.page-${i+1}{
                            transform: translateX(${i * iw * -1}px);
                        }`
            i++;
        })
        newStyle.innerHTML = str;
        document.body.appendChild(newStyle);

        document.querySelectorAll("button").forEach((elem) => {
            elem.onclick = function (e) {
                document.querySelector("button[class='actived']").classList.remove("actived");
                slideWin.className = `slide-window ${e.target.id}`;
                e.currentTarget.classList.add("actived");
            }
        })