import { Request, Response } from "express";


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
