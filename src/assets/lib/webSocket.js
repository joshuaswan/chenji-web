import WebSocketHeartBeat from './webSocketHeartBeat'
const webSocket = {
  // install 是默认的方法。当外界在 use 这个组件的时候，就会调用本身的 install 方法，同时传一个 Vue 这个类的参数。
  install: function (Vue, connection) {
    let webSocket

    webSocket = new WebSocketHeartBeat({
      url: connection
    })

    webSocket.onopen = function () {
      console.log('open webSocket')
    }

    webSocket.onclose = function (ev) {
      console.log('on close')
    }

    webSocket.onerror = function (ev) {
      console.log(ev)
      console.log('web socket on error')
    }

    webSocket.onreconnect = function () {
      console.log('reconnecting...')
    }

    Vue.prototype.$webSocket = webSocket
  }
}

export default webSocket
