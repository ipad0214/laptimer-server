"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var bodyParser = __importStar(require("body-parser"));
var race_routes_1 = require("./routes/race.routes");
var user_routes_1 = require("./routes/user.routes");
var cars_routes_1 = require("./routes/cars.routes");
var HttpServer = /** @class */ (function () {
    function HttpServer(port, websocket, dbServerApi) {
        this.port = port;
        this.websocket = websocket;
        this.dbServerApi = dbServerApi;
        this.raceRoutes = new race_routes_1.RaceRoutes();
        this.userRoutes = new user_routes_1.UserRoutes();
        this.carRoutes = new cars_routes_1.CarRoutes();
        this.app = express_1.default();
        this.config();
        this.raceRoutes.routes(this.app, this.websocket);
        this.userRoutes.routes(this.app, this.dbServerApi);
        this.carRoutes.routes(this.app, this.dbServerApi);
    }
    HttpServer.prototype.config = function () {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
    };
    HttpServer.prototype.run = function () {
        this.app.listen(this.port, function () {
            console.log("server started");
        });
    };
    return HttpServer;
}());
exports.HttpServer = HttpServer;
//# sourceMappingURL=http.server.js.map