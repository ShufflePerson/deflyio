

var wsHook = {};
(function () {
    // Mutable MessageEvent.
    // Subclasses MessageEvent and makes data, origin and other MessageEvent properites mutatble.
    function MutableMessageEvent(o) {
        this.bubbles = o.bubbles || false;
        this.cancelBubble = o.cancelBubble || false;
        this.cancelable = o.cancelable || false;
        this.currentTarget = o.currentTarget || null;
        this.data = o.data || null;
        this.defaultPrevented = o.defaultPrevented || false;
        this.eventPhase = o.eventPhase || 0;
        this.lastEventId = o.lastEventId || "";
        this.origin = o.origin || "";
        this.path = o.path || new Array(0);
        this.ports = o.parts || new Array(0);
        this.returnValue = o.returnValue || true;
        this.source = o.source || null;
        this.srcElement = o.srcElement || null;
        this.target = o.target || null;
        this.timeStamp = o.timeStamp || null;
        this.type = o.type || "message";
        this.__proto__ = o.__proto__ || MessageEvent.__proto__;
    }

    var before = (wsHook.before = function (data, url, wsObject) {
        return data;
    });
    var after = (wsHook.after = function (e, url, wsObject) {
        return e;
    });
    var modifyUrl = (wsHook.modifyUrl = function (url) {
        return url;
    });
    wsHook.resetHooks = function () {
        wsHook.before = before;
        wsHook.after = after;
        wsHook.modifyUrl = modifyUrl;
    };

    var _WS = WebSocket;
    WebSocket = function (url, protocols) {
        var WSObject;
        url = wsHook.modifyUrl(url) || url;
        this.url = url;
        this.protocols = protocols;
        if (!this.protocols) {
            WSObject = new _WS(url);
        } else {
            WSObject = new _WS(url, protocols);
        }

        var _send = WSObject.send;
        WSObject.send = function (data) {
            arguments[0] = wsHook.before(data, WSObject.url, WSObject) || data;
            _send.apply(this, arguments);
        };

        // Events needs to be proxied and bubbled down.
        WSObject._addEventListener = WSObject.addEventListener;
        WSObject.addEventListener = function () {
            var eventThis = this;
            // if eventName is 'message'
            if (arguments[0] === "message") {
                arguments[1] = (function (userFunc) {
                    return function instrumentAddEventListener() {
                        arguments[0] = wsHook.after(
                            new MutableMessageEvent(arguments[0]),
                            WSObject.url,
                            WSObject
                        );
                        if (arguments[0] === null) return;
                        userFunc.apply(eventThis, arguments);
                    };
                })(arguments[1]);
            }
            return WSObject._addEventListener.apply(this, arguments);
        };

        Object.defineProperty(WSObject, "onmessage", {
            set: function () {
                var eventThis = this;
                var userFunc = arguments[0];
                var onMessageHandler = function () {
                    arguments[0] = wsHook.after(
                        new MutableMessageEvent(arguments[0]),
                        WSObject.url,
                        WSObject
                    );
                    if (arguments[0] === null) return;
                    userFunc.apply(eventThis, arguments);
                };
                WSObject._addEventListener.apply(this, [
                    "message",
                    onMessageHandler,
                    false,
                ]);
            },
        });

        return WSObject;
    };
    WebSocket.CONNECTING = _WS.CONNECTING;
    WebSocket.OPEN = _WS.OPEN;
    WebSocket.CLOSING = _WS.CLOSING;
    WebSocket.CLOSED = _WS.CLOSED;
})();


function buf2hex(buffer) { // buffer is an ArrayBuffer
    return [...new Uint8Array(buffer)]
        .map(x => x.toString(16).padStart(2, '0'))
        .join('');
}

function hex2buf(hex) {
    return new Uint8Array(hex.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));
}


let times_sent = 0;

function send_data(data, type = "send") {
    try {

        let xhr = new XMLHttpRequest();
        xhr.open("POST", "http://localhost:3003/" + type + "_proxy", false);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify({ data: data }));
    } catch (ex) {
    }
}

let sent_startup = false;
wsHook.before = function (data, url, wsObject) {
    if (!sent_startup) {
        send_data(url);
        sent_startup = true;
    }
    if (data instanceof ArrayBuffer) {
        send_data(buf2hex(data));
    }
};



wsHook.after = function (messageEvent, url, wsObject) {
    let { data } = messageEvent;
    let hex = buf2hex(data);
    send_data(hex, "get")
    return messageEvent;
};
