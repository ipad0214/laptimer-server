import { Request, Response } from "express";
import {RaceModel} from "../../models/race.model";
import {DriverModel} from "../../models/driver.model";
import {RaceController} from "../../controller/race.conntroller";

export class RaceRoutes {
    constructor(
        private raceController: RaceController
    ) {}

    public routes(app: any): void {
        app.route("/")
            .get((req: Request, res: Response) => {
                res.send("root route");
            });

        app.route("/race")
            .get((req: Request, res: Response) => {
                res.status(200).send("received");
            });

        app.route("/race/start") 
            .post((req: Request, res: Response) => {
                res.status(200).send();
            })
            .get((req: Request, res: Response) => {
                console.log("GET");
                res.status(200).send("received");
            });

        app.route("race/round/finished")
            .post((req: Request, res: Response) => {
                this.raceController.roundUp(req.body.lane);
            });
    }
}
