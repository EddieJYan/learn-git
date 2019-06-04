/**
 * Created by Eddie on 2018-06-04
 */

var dom = document.querySelector("#content");
if (dom) {
    dom.innerHTML = `main.js 加载完成!`;
} else {
    alert(`content 的元素不存在!`);
}
