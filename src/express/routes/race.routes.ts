import { Request, Response } from "express";
import { RaceModel } from "../../models/race.model";
import { DriverModel } from "../../models/driver.model";
import { RaceController } from "../../controller/race.controller";

export class RaceRoutes {
    constructor(
        private raceController: RaceController
    ) {}

    public routes(app: any): void {
        app.route("/")
            .get((req: Request, res: Response) => {
                res.send("root route");
            });

        app.route("/race/start")
            .get((req: Request, res: Response) => {
                res.status(200).send("received");
            });

        app.route("/race/setup")
            .post((req: Request, res: Response) => {
                let { body } = req;
                this.raceController.setup(body.laneOne, body.laneTwo);
                res.status(200).send();
            })
            .get((req: Request, res: Response) => {
                console.log("GET");
                res.status(200).send("received");
            });

        app.route("/race/round")
            .post((req: Request, res: Response) => {
                let { body } = req;
                console.log(body);
                //send via websocket to clients
                this.raceController.countRound(body.roundFinished);
            });
    }
}
