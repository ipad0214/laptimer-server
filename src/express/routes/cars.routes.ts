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
            })
            .put((req, res) => {
                this.carsDatabase.find({}).then((result) => {
                    res.status(200).send(result)
                    let { query, body } = req;
                    if (query.id !== undefined) {
                        this.carsDatabase.update(query.id, body).then(response => {
                            res.status(200).send(response);
                        });
                    }
                });
            })
            .delete((req, res) => {
                this.carsDatabase.delete(req.query.id).then(response => {
                    res.status(200).send(req.query.id);
                });
            });
    }
} 
