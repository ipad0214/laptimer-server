"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RaceRoutes = /** @class */ (function () {
    function RaceRoutes() {
    }
    RaceRoutes.prototype.routes = function (app, websocket) {
        app.route("/")
            .get(function (req, res) {
            res.send("root route");
        });
        app.route("/race")
            .get(function (req, res) {
            console.log("test");
            res.status(200).send("received");
        });
        app.route("/race/start")
            .post(function (req, res) {
            console.log("POST");
            console.log(req.body);
            websocket.send(JSON.stringify(req.body));
            res.status(200).send("received");
        })
            .get(function (req, res) {
            console.log("GET");
            res.status(200).send("received");
        });
    };
    return RaceRoutes;
}());
exports.RaceRoutes = RaceRoutes;
//# sourceMappingURL=race.routes.js.map