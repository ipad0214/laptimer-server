import { Request, Response } from "express";
import { CarsDatabase } from './../../db/cars'
import {CarModel} from "../../models/car.model";

export class CarRoutes {
    public carsDatabase = new CarsDatabase();

    constructor() {}

    public routes(app: any): void {
        app.route("/car") 
            .post((req: Request, res: Response) => {
                let { body }  = req;
                this.carsDatabase.insert(body).then(success => {
                    this.carsDatabase.find({}).then(result => {
                        res.status(200).send(result);
                    });
                });
            })
            .get((req: Request, res: Response) => {
                this.carsDatabase.find({}).then((result) => {
                    res.status(200).send(result)
                });
            });
    }
} 
