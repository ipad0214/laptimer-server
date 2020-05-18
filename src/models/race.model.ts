import {DriverModel} from "./driver.model";
import {Lane} from "./lane.model";

export class RaceModel {
    constructor(public laneOne: Lane, public laneTwo: Lane, public duration: number) { }
    public gap: string = "";
    public started: boolean = false;
    public aborted: boolean = false;
}
