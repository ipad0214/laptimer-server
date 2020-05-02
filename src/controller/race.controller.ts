import { RaceModel } from '../models/race.model';
import { Lane } from "../models/lane.model";
import { CarsDatabase } from "../db/cars";
import { DriverDatabase } from "../db/driver";

import axios from "axios";

export class RaceController {
    public activeRace: RaceModel = new RaceModel(new Lane(), new Lane());
    private archIp = "192.168.2.219";

    constructor(
        private carsDatabase: CarsDatabase,
        private driverDatabase: DriverDatabase
    ) {}

    public async setup(laneOne: any, laneTwo: any) {
        let carOne = await this.carsDatabase.single({id: laneOne.car});
        let driverOne = await this.driverDatabase.single({id: laneOne.driver});
        let carTwo = await this.carsDatabase.single({id: laneTwo.car});
        let driverTwo = await this.driverDatabase.single({id: laneTwo.driver});
        this.activeRace = new RaceModel(new Lane(carOne, driverOne), new Lane(carTwo, driverTwo));
    }

    public start() {
        axios.get(`http://${this.archIp}/start`).then(resp => {
            this.activeRace.started = resp.data.started;
        });
    }

    public abort() {
        axios.get(`http://${this.archIp}/start`).then(resp => {
            this.activeRace.started = resp.data.started;
            this.activeRace.aborted = resp.data.abort;
        });
    }

    private calcGap() {

    }

    private update() {

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
