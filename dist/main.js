"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var websocket_1 = require("./websocket/websocket");
var http_server_1 = require("./express/http.server");
var db_server_api_1 = require("./api/db.server.api");
var PORT_HTTP = 4713;
var PORT_WSS = 4712;
var PORT_DB = 5000;
var Main = /** @class */ (function () {
    function Main() {
        this.dbServerApi = new db_server_api_1.DbServerApi(PORT_DB);
        this.raceWebSocket = new websocket_1.RaceWebSocket(PORT_WSS);
        this.httpServer = new http_server_1.HttpServer(PORT_HTTP, this.raceWebSocket, this.dbServerApi);
    }
    Main.prototype.run = function () {
        this.httpServer.run();
        console.log("waiting for websocket");
    };
    return Main;
}());
var main = new Main();
main.run();
//# sourceMappingURL=main.js.map