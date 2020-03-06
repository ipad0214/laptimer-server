import {DriverModel} from "./driver.model";

export class RaceModel {
    constructor(public driverOne: DriverModel = new DriverModel(), public driverTwo: DriverModel = new DriverModel()) { }
    public driverOneLane: number = 0;
    public driverTwoLane: number = 0;
    public duration: number = 0;
    public CarOneProgress: number = 0;
    public CarTwoProgress: number = 0;
    public carOne: number = 0;
    public carTwo: number = 0;
    public leader: number = 0;
    public gab: string = "";
}
