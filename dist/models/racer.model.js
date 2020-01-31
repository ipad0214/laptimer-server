"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RacerModel = /** @class */ (function () {
    function RacerModel(name, profileId) {
        this.leader = false;
        this.rounds = 0;
        this.car = 1;
        this.profileId = 0;
        this.name = "";
        this.name = name || "";
        this.profileId = profileId || 0;
    }
    return RacerModel;
}());
exports.RacerModel = RacerModel;
//# sourceMappingURL=racer.model.js.map