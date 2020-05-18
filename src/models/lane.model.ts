import { DriverModel } from "./driver.model";
import { CarModel } from "./car.model";

export class Lane {
    constructor(public car: CarModel = new CarModel(), public driver: DriverModel = new DriverModel()) { }

    public rounds: number = 0;
    public leader: boolean = false;
}
