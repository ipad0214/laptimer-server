import { RaceModel } from '../models/race.model';
import { Lane } from "../models/lane.model";
import { CarsDatabase } from "../db/cars";
import { DriverDatabase } from "../db/driver";

import axios from "axios";

export class RaceController {
    public activeRace: RaceModel = new RaceModel(new Lane(), new Lane(), 10);
    private archIp = "192.168.2.156";

    constructor(
        private carsDatabase: CarsDatabase,
        private driverDatabase: DriverDatabase
    ) {}

    public async setup(raceObj: any) {
        let carOne = await this.carsDatabase.single({id: raceObj.carLaneOne});
        let driverOne = await this.driverDatabase.single({id: raceObj.driverLaneOne});
        let carTwo = await this.carsDatabase.single({id: raceObj.carLaneTwo});
        let driverTwo = await this.driverDatabase.single({id: raceObj.driverLaneTwo});
        this.activeRace = new RaceModel(new Lane(carOne, driverOne), new Lane(carTwo, driverTwo), raceObj.duration);
    }

    public start() {
        axios.get(`http://${this.archIp}/start`).then(resp => {
            this.activeRace.started = resp.data.started;
        }).catch(err => console.log(err));
    }

    public abort() {
        axios.get(`http://${this.archIp}/abort`).then(resp => {
            this.activeRace.started = resp.data.started;
            this.activeRace.aborted = resp.data.abort;
        });
    }

    public raceFinished() {
        axios.get(`http://${this.archIp}/finish`).then(resp => {});
    }

    private checkRaceFinished() {
        if(this.activeRace.duration < this.activeRace.laneOne.rounds) {
            this.raceFinished();
        }

        if(this.activeRace.duration < this.activeRace.laneTwo.rounds) {
            this.raceFinished();
        }
    }

    public countRound(lane: number) {
        if(this.activeRace !== undefined) {
            if (lane === 0) {
                this.activeRace.laneOne.rounds += 1;
                this.checkLeader();
            }

            if (lane === 1) {
                this.activeRace.laneTwo.rounds += 1;
                this.checkLeader();
            }

            this.checkRaceFinished();
        }
    }

    public checkLeader() {
        if(this.activeRace.laneOne.rounds > this.activeRace.laneTwo.rounds) {
            this.activeRace.laneOne.leader = true;
            this.activeRace.laneTwo.leader = false;
        }
        if(this.activeRace.laneTwo.rounds > this.activeRace.laneOne.rounds) {
            this.activeRace.laneOne.leader = false;
            this.activeRace.laneTwo.leader = true;
        }
    }
}
