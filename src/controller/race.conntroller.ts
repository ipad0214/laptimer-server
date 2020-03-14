import { RaceWebSocket } from '../websocket/websocket';
import { RaceModel } from '../models/race.model';
import { CarsDatabase } from "../db/cars";
import { DriverDatabase } from "../db/driver";
import { Lane } from "../models/lane.model";
import * as axios from "axios"

export class RaceController {
    private activeRace: RaceModel | undefined;

    constructor(
        private websocket: RaceWebSocket,
        private carDB: CarsDatabase,
        private driverDB: DriverDatabase
    ) {}

    public setup(laneOne: Lane, laneTwo: Lane) {
        let raceModel = new RaceModel(laneOne, laneTwo);

        this.activeRace = raceModel;
        return raceModel;
    }

    public start() {

    }

    private calcGap() {

    }

    private update() {
        this.websocket.send(JSON.stringify(this.activeRace));
    }
}
