import { Request, Response } from "express";
import { ConfigDatabase } from "../../db/config";

export class ConfigRoutes {
    constructor(
        private configDatabase: ConfigDatabase
    ) {}

    public routes(app: any): void {
        app.route("/config/start")
            .get((req: Request, res: Response) => {
                this.configDatabase.load().then(result => {
                    res.status(200).send(JSON.stringify(result));
                });

            })
            .post((req: Request, res: Response) => {
                res.status(200).send("received");
            })
            .delete((req, res) => {
                res.status(200).send("received");
            });
        app.route("/ping")
            .get((req, res) => {
                res.status(200).send(JSON.stringify({
                    heartbeat: true,
                }));
            });
    }
}