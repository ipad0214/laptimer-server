import { RaceWebSocket } from '../websocket/websocket';
import { RaceModel } from '../models/race.model';

export class RaceController {
    private activeRace: RaceModel | undefined;

    constructor(
        private websocket: RaceWebSocket,
    ) {}

    public setup(raceModel: RaceModel) {
        this.activeRace = raceModel;
    }

    public start() {

    }

    public roundUp(lane: number) {
        if(lane === 1) {
            this.activeRace.driverOneLane++;
        } else if (lane === 2) {
            this.activeRace.driverTwoLane++;
        } else {
            console.log("no lane selected");
        }

    }

    private calcGap() {

    }
}
