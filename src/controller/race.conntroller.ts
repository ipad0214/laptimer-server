import { RaceWebSocket } from '../websocket/websocket';
import { RaceModel } from '../models/race.model';
import {CarsDatabase} from "../db/cars";
import {DriverDatabase} from "../db/driver";
import {Lane} from "../models/lane.model";
import axios from "axios";
import {response} from "express";


export class RaceController {
    private activeRace: RaceModel;

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
        axios.post("http://192.168.2.100/start", (response) => {
           console.log("start sequence started");
        });
    }

    private calcGap() {

    }

    private update() {
        this.websocket.send(JSON.stringify(this.activeRace));
    }

    public countRound(lane: number) {
        if(this.activeRace !== undefined) {

        }
    }
}
