import axios from "axios";

import { Request, Response } from "express";
import { DbServerApi } from '../../api/db.server.api';


export class UserRoutes {
    constructor() {}

    public routes(app: any, dbServerApi: DbServerApi): void {
        app.route("/user") 
            .post((req: Request, res: Response) => {
                dbServerApi.post("user", req.body).then((response) => {
                    res.status(200).send(response);
                });
            })
            .get((req: Request, res: Response) => {
                dbServerApi.get("user", req.body).then((response) => {
                    res.status(200).send(response);
                });
            });
    }
}