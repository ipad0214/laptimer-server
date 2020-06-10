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

        app.route("/race/finish")
            .get((req: Request, res: Response) => {
                res.status(200).send("received");
                this.raceController.raceFinished();
            });

        app.route("/race/abort")
            .get((req: Request, res: Response) => {
                res.status(200).send("received");
                this.raceController.abort();
            });

        app.route("/race/setup")
            .post((req: Request, res: Response) => {
                let { body } = req;
                this.raceController.setup(body).then(() => res.status(200).send(this.raceController.activeRace));
            })
            .get((req: Request, res: Response) => {
                res.status(200).send(this.raceController.activeRace);
            });

        app.route("/race/round")
            .post((req: Request, res: Response) => {
                console.log(req.body);
                let { body } = req;
                this.raceController.countRound(body.lane);
                res.status(200).send("OK");
            });

        app.route('/race/update')
            .get((req: Request, res: Response)=> {
                let race = JSON.stringify(this.raceController.activeRace);
                res.status(200).send(race);
        });
    }
}
