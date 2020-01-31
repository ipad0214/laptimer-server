import axios from "axios";

import { Request, Response } from "express";
import { DbServerApi } from '../../api/db.server.api';

export class CarRoutes {
    constructor() {}

    public routes(app: any, dbServerApi: DbServerApi): void {
        app.route("/car") 
            .post((req: Request, res: Response) => {
                dbServerApi.post("car", req.body).then((response) => {
                    res.status(200).send(response);
                });
            })
            .get((req: Request, res: Response) => {
                dbServerApi.get("car", req.body).then((response) => {
                    res.status(200).send(response);
                });
            });
    }
} 