import {DriverModel} from "./driver.model";
import {Lane} from "./lane.model";

export class RaceModel {
    constructor(public laneOne?: Lane, public laneTwo?: Lane) { }
    public duration: number = 0;
    public leader: number = 0;
    public gap: string = "";
}
