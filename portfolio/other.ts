declare function JQuery(select: string | NodeListOf<Element> | Array<Element>):void
interface JQuery{
    elemList:Array<Element>
    addClass:Function
    getChildElements:Function
    setText:Function
}



function jQuery(select: string | NodeListOf<Element> | Array<Element>) {
    let curNode: Array<Element> = [];
    let temNodeList: NodeListOf<Element> | null | Array<Element>;

    if ("string" === typeof (select)) {
        temNodeList = document.querySelectorAll(select);
    } else if (/nodelist/.test(Object.prototype.toString.call(select).toLowerCase())) {
        temNodeList = select;
    } else if (/array/.test(Object.prototype.toString.call(select).toLowerCase())) {
        temNodeList = select;
    }
    else { temNodeList = null }

    //统一格式化
    if (temNodeList) {
        temNodeList.forEach((item: Element) => {
            curNode.push(item);
        })
    }

    return {
        elemList: curNode.concat([]),
        /**
         * @method addClass 
         * @description 为制定元素增加类名
         * @param {string} className  类名
         * @returns {JQuery} 重新返回一个封装对象 用于链式操作
         */
        addClass: function (className: string):JQuery {
            this.elemList.forEach((item: Element) => {
                item.classList.add(className);
            })
            return jQuery(this.elemList);
        },

        /**
         * @method getChildElements 
         * @description 寻找制定元素内部的节点元素
         * @param {string} str  选择器字符串
         * @returns {JQuery} 将找到的元素重新封装对象 用于链式操作
         */
        getChildElements: function (str: string):JQuery {
            let result: Array<Element> = [];
            this.elemList.forEach((item: Element) => {
                if (item.nodeType === 1) {
                    item.querySelectorAll(str).forEach((item: Element) => {
                        result.push(item)
                    })
                }
            })            
            return jQuery(result);
        },

        /**
         * @method setText 
         * @description 设置类名
         * @param {string} text  需要修改的文字内容
         * @returns {JQuery} 重新返回一个封装对象 用于链式操作
         */
        setText: function (text: string):JQuery {
            this.elemList.forEach((item: Element) => {
                item.textContent = text;
            })
            return jQuery(this.elemList);
        }        
    }
}

