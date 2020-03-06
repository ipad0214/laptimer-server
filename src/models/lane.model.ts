import {DriverModel} from "./driver.model";
import {CarModel} from "./car.model";

export class Lane {
    constructor(public driverId: number, public carId: number) {}

    public rounds: number = 0;
    public driver: DriverModel = new DriverModel();
    public car: CarModel = new CarModel();
}
