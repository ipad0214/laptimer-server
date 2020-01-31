"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = __importDefault(require("axios"));
var DbServerApi = /** @class */ (function () {
    function DbServerApi(port) {
        this.port = port;
        this.baseUrl = "http://localhost:" + this.port;
    }
    DbServerApi.prototype.get = function (route, params) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            axios_1.default.get(_this.baseUrl + "/" + route, { params: params }).then(function (result) {
                resolve(result.data);
            });
        });
    };
    DbServerApi.prototype.post = function (route, model) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            axios_1.default.post(_this.baseUrl + "/" + route, model).then(function (result) {
                resolve(result.data);
            });
        });
    };
    return DbServerApi;
}());
exports.DbServerApi = DbServerApi;
//# sourceMappingURL=db.server.api.js.map