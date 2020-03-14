import { RaceWebSocket } from '../websocket/websocket';
import { RaceModel } from '../models/race.model';
import { CarsDatabase } from "../db/cars";
import { DriverDatabase } from "../db/driver";
import { Lane } from "../models/lane.model";
import axios from "axios";
import {response} from "express";


export class RaceController {
    private activeRace: RaceModel = new RaceModel();

    constructor(
        private websocket: RaceWebSocket
    ) {}

    public setup(laneOne: Lane, laneTwo: Lane) {
        this.activeRace = new RaceModel(laneOne, laneTwo);
    }

    public start() {
        axios.post("http://192.168.2.100/start", (response) => {
           console.log("start sequence started");
        });
    }

    private calcGap() {

    }

    private update() {
        this.checkRaceFinished();
        this.websocket.send(JSON.stringify(this.activeRace));
    }

    private raceFinished() {
        axios.post("http://192.168.2.100/finished", response => {
            console.log(response);
        });
    }

    private checkRaceFinished(): Promise<boolean> {
        return new Promise<boolean> ((resolve, reject) => {
            if(this.activeRace.duration === this.activeRace.laneOne.rounds) {
                this.raceFinished();
            }

            if(this.activeRace.duration === this.activeRace.laneTwo.rounds) {
                this.raceFinished();
            }
        });
    }

    public countRound(lane: number) {
        if(this.activeRace !== undefined) {
            if (lane === 0) {
                this.activeRace.laneOne.rounds += 1;
            }

            if (lane === 1) {
                this.activeRace.laneTwo.rounds += 1;
            }
            this.update()
        }
    }
}
