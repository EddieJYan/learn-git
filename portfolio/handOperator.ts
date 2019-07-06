
// class Gesture {
//     node: Element;
//     handlers: any;
//     x1: Number = 0;
//     y1: Number = 0;
//     constructor(node: Element | null) {
//         if (node) {
//             this.node = node;
//         } else {
//             throw new Error("type error:")
//         }

//         this.handlers = { tap: [], doubletap: [], swipe: [] }
//     }

//     bind() {
//         this.node.addEventListener("ontouchstart", (e: TouchEventInit) => {
//             this.dispatch("ontouchstart", e);

//             this.x1 = e.touches ? e.touches[0].pageX : 0;
//             this.y1 = e.touches ? e.touches[0].pageY : 0;
//         })
//         this.node.addEventListener("ontouchmove", (e: Event) => {

//         })
//         this.node.addEventListener("ontouchend", (e: Event) => {

//         })
//     }
//     dispatch(eventType: string, e: TouchEventInit) {
//         this.handlers[eventType].forEach((handler: Function) => {
//             handler.call(this.node, e);
//         })
//     }
//     on(eventType: string, handler: Function) {
//         this.handlers[eventType].push(handler)
//     }
// }

// let touchNode: Element | null = document.querySelector("touch");
// var gesture = new Gesture(touchNode);
// gesture.on("tap", () => {

// });




// class Gesture {
//     constructor(el: string) {
//         this.element = typeof el === 'string' ? document.querySelector(el) : el
//         this.handlers = { touchstart: [], touchend: [], touchmove: [], tap: [], doubletap: [], pinch: [], rotate: [], swipe: [], pressMove: [] }

//         this.delta = null
//         this.last = null
//         this.now = null
//         this.tapTimeout = null
//         this.x1 = this.x2 = this.y1 = this.y2 = null
//         this.preTapPosition = { x: null, y: null }
//         this.isDoubleTap = false

//         this.bind()
//     }

//     dispatch(type, evt) {
//         this.handlers[type].forEach(handler => handler.call(this.element, evt))
//     }

//     bind() {
//         this.element.addEventListener('touchstart', evt => {
//             this.dispatch('touchstart', evt)

//             this.x1 = evt.touches[0].pageX
//             this.y1 = evt.touches[0].pageY
//             this.now = Date.now()
//             this.delta = this.last ? this.now - this.last : 0

//             if (this.preTapPosition !== null) {
//                 this.isDoubleTap = (this.delta > 0 && this.delta <= 300
//                     && Math.abs(this.x1 - this.preTapPosition.x) < 30
//                     && Math.abs(this.y1 - this.preTapPosition.y) < 30)
//                 if (this.isDoubleTap) {
//                     clearTimeout(this.tapTimeout)
//                 }

//             }

//             this.preTapPosition.x = this.x1
//             this.preTapPosition.y = this.y1

//             this.last = this.now

//         })

//         this.element.addEventListener('touchmove', evt => {
//             this.dispatch('touchmove', evt)
//             this.x2 = evt.touches[0].pageX
//             this.y2 = evt.touches[0].pageY
//         })

//         this.element.addEventListener('touchend', evt => {
//             if ((this.x2 && Math.abs(this.x1 - this.x2) > 30) ||
//                 (this.y2 && Math.abs(this.y1 - this.y2) > 30)) {
//                 let direction = this._swipeDirection(this.x1, this.x2, this.y1, this.y2)
//                 evt.direction = direction
//                 this.dispatch('swipe', evt)
//                 return
//             }

//             if (!this.isDoubleTap) {
//                 this.tapTimeout = setTimeout(() => {
//                     this.dispatch('tap', evt)
//                 }, 300)
//             }

//             if (this.isDoubleTap) {
//                 this.dispatch('doubletap', evt)
//                 this.isDoubleTap = false
//             }
//         })


//     }

//     on(type, handler) {
//         if (this.handlers[type]) {
//             this.handlers[type].push(handler)
//         }
//     }

//     off(type, handler) {
//         if (this.handlers[type] && this.handlers[type].indexOf(handler) !== -1) {
//             this.handlers[type].splice(this.handlers[type].indexOf(handler), 1)
//         }
//     }

//     _swipeDirection(x1, x2, y1, y2) {
//         return Math.abs(x1 - x2) >= Math.abs(y1 - y2) ? (x1 - x2 > 0 ? 'Left' : 'Right') : (y1 - y2 > 0 ? 'Up' : 'Down')
//     }
// }






// const log = s => document.querySelector('.log').innerText = s


/*


const gesture = new Gesture('.touch')
gesture.on('tap', function() {
  log('tap')
})

gesture.on('doubletap', function() {
  log('doubleTap')
})


gesture.on('swipe', function(evt) {
  console.log('swipe', evt)
})








const HGesture = (function(){
  let gestures = []

  function init(selectors) {
    let nodeArray = [...document.querySelectorAll(selectors)]
    let newGestures = nodeArray.map(node => new Gesture(node) )
    newGestures.forEach(gesture => {
      const handler = function(type) {
        return function() {
          gesture.element.dispatchEvent(new CustomEvent(type, { detail: arguments[1] }))
        }
      }
      gesture.handlers.tap = [handler('tap')]
      gesture.handlers.doubletap = [handler('doubletap')]
      gesture.handlers.swipe = [handler('swipe')]
    })
    gestures.push(...newGestures)
  }

  function list() {
    return gestures
  }

  return {
    init,
    list
  }
})()



HGesture.init('.touch')

document.querySelectorAll('.touch').forEach(node => {
  node.addEventListener('swipe',  evt => {
    console.log('swipe', evt)
    //log('swipe'+ evt.detail.direction)
  })

})



*/

// const JGesture = (() => {
//     const gestures = []

//     const on = (type, selectors, handler) => {
//         let newGestures = [...document.querySelectorAll(selectors)].map(node => new Gesture(node))
//         newGestures.forEach(gesture => {
//             gesture.on(type, handler)
//         })
//     }

//     const off = () => { }

//     return {
//         on,
//         off
//     }
// })()



// JGesture.on('swipe', '.touch', function (evt) {
//     console.log(this)  //应该指向dom元素
//     console.log('swipe', evt)
// })
