import axios from "axios";

import { Request, Response } from "express";
import { DbServerApi } from '../../api/db.server.api';


export class UserRoutes {
    constructor() {}

    public routes(app: any): void {
        app.route("/user") 
            .post((req: Request, res: Response) => {
                let { body } = req;
                console.log(body);
            })
            .get((req: Request, res: Response) => {
                let { body } = req;
                console.log(body);
            });
    }
}