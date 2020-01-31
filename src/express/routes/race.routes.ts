import { Request, Response } from "express";

export class RaceRoutes {
    constructor() {}

    public routes(app: any, websocket: any): void {
        app.route("/")
            .get((req: Request, res: Response) => {
                res.send("root route");
            });

        app.route("/race")
            .get((req: Request, res: Response) => {
                console.log("test")
                res.status(200).send("received");
            });

        app.route("/race/start") 
            .post((req: Request, res: Response) => {
                console.log("POST");
                console.log(req.body);
                websocket.send(JSON.stringify(req.body));
                res.status(200).send("received");
            })
            .get((req: Request, res: Response) => {
                console.log("GET");
                res.status(200).send("received");
            });
    }
}