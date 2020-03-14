import { DriverModel } from "./driver.model";
import { CarModel } from "./car.model";
import {DriverDatabase} from "../db/driver";
import {CarsDatabase} from "../db/cars";

export class Lane {
    constructor(public driverId: number, public carId: number) {
        let driverDatabase = new DriverDatabase();
        let carsDatabase = new CarsDatabase();

        carsDatabase.find({id: carId}).then((result) => {
            if(result.length > 0) {
                this.car = result[0];
            }
        });

        driverDatabase.find({id: driverId}).then((result) => {
            if(result.length > 0) {
                this.driver = result[0];
            }
        });
    }

    public rounds: number = 0;
    public driver: DriverModel = new DriverModel();
    public car: CarModel = new CarModel();
}
