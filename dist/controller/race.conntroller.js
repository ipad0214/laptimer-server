"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RaceController = /** @class */ (function () {
    function RaceController(websocket) {
        this.websocket = websocket;
        this.raceProgress = 0;
        this.raceLength = 10;
        this.racerOne = "";
        this.racerTwo = "";
    }
    return RaceController;
}());
exports.RaceController = RaceController;
//# sourceMappingURL=race.conntroller.js.map