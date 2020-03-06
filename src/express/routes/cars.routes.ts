import { Request, Response } from "express";
import { CarsDatabase } from './../../db/cars'

export class CarRoutes {
    constructor(
        public carsDatabase: CarsDatabase
    ) {}

    public routes(app: any): void {
        app.route("/car") 
            .post((req: Request, res: Response) => {
                let { body }  = req;
                this.carsDatabase.insert(body).then(() => {
                    this.carsDatabase.find({}).then(result => {
                        res.status(200).send(result);
                    });
                });
            })
            .get((req: Request, res: Response) => {
                let { query } = req;
                if(query.id !== undefined) {
                    this.carsDatabase.single({id: query.id}).then((car) => {
                        res.status(200).send(car);
                        return;
                    });
                }

                this.carsDatabase.find({}).then((result) => {
                    res.status(200).send(result)
                });
            });
    }
} 
