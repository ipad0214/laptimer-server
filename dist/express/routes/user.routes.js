"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var UserRoutes = /** @class */ (function () {
    function UserRoutes() {
    }
    UserRoutes.prototype.routes = function (app, dbServerApi) {
        app.route("/user")
            .post(function (req, res) {
            dbServerApi.post("user", req.body).then(function (response) {
                res.status(200).send(response);
            });
        })
            .get(function (req, res) {
            dbServerApi.get("user", req.body).then(function (response) {
                res.status(200).send(response);
            });
        });
    };
    return UserRoutes;
}());
exports.UserRoutes = UserRoutes;
//# sourceMappingURL=user.routes.js.map