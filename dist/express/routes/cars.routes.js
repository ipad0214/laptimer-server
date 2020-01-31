"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CarRoutes = /** @class */ (function () {
    function CarRoutes() {
    }
    CarRoutes.prototype.routes = function (app, dbServerApi) {
        app.route("/car")
            .post(function (req, res) {
            dbServerApi.post("car", req.body).then(function (response) {
                res.status(200).send(response);
            });
        })
            .get(function (req, res) {
            dbServerApi.get("car", req.body).then(function (response) {
                res.status(200).send(response);
            });
        });
    };
    return CarRoutes;
}());
exports.CarRoutes = CarRoutes;
//# sourceMappingURL=cars.routes.js.map