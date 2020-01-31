"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var WebSocket = __importStar(require("ws"));
var RaceWebSocket = /** @class */ (function () {
    function RaceWebSocket(port) {
        var _this = this;
        this.port = port;
        this.clients = new Array();
        this.wss = new WebSocket.Server({ port: this.port });
        this.wss.on("connection", function (ws, req) {
            _this.clients.push(ws);
            ws.on('close', function () {
                console.log("disconnected");
            });
            ws.on("message", function () {
                ws.send("you send something");
            });
        });
    }
    RaceWebSocket.prototype.send = function (msg) {
        this.clients.forEach(function (element) {
            element.send(msg);
        });
    };
    return RaceWebSocket;
}());
exports.RaceWebSocket = RaceWebSocket;
//# sourceMappingURL=websocket.js.map