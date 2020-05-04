import { Request, Response } from "express";
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
                this.raceController.start();
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
                this.raceController.countRound(body.lane);
                res.status(200).send(body);
            });

        app.route('/race/update')
            .get((req: Request, res: Response)=> {
                let race = JSON.stringify(this.raceController.activeRace);
                res.status(200).send(race);
        });
    }
}
