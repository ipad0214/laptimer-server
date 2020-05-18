import { Request, Response } from "express";
import {DriverDatabase} from "../../db/driver";
import {CarsDatabase} from "../../db/cars";
import {DriverModel} from "../../models/driver.model";


export class UserRoutes {
    constructor(
        public driverDatabase: DriverDatabase,
        public carsDatabase: CarsDatabase
    ) {}

    public routes(app: any): void {
        app.route("/user")
            .post((req: Request, res: Response) => {
                let { body } = req;
                this.driverDatabase.insert(body).then(() => {
                    this.driverDatabase.find({}).then(result => {
                        res.status(200).send(result);
                    });
                });
            })
            .get(async (req: Request, res: Response) => {
                let { query } = req;
                if(query.id === undefined) {
                    let drivers = await this.driverDatabase.find({});
                    let driversWithCars: Array<any> = [];
                    for (const driver of drivers) {
                        let carId = driver.favoriteCar;
                        driver.favoriteCarObj = await this.carsDatabase.single({id: carId});
                        driversWithCars.push(driver)
                    }
                    return res.status(200).send(driversWithCars);
                }

                this.driverDatabase.single({id: Number(query.id)}).then((result: DriverModel) => {
                    this.carsDatabase.single({id: result.favoriteCar}).then(car => {
                        return res.status(200).send({...result, car: car[0]});
                    });
                });
            });
    }
}
