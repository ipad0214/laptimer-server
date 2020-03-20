import express from "express"
import cors from "cors";
import * as bodyParser from "body-parser"
import { RaceRoutes } from './routes/race.routes';
import { UserRoutes } from './routes/user.routes';
import { CarRoutes } from './routes/cars.routes';
import {CarsDatabase} from "../db/cars";
import {DriverDatabase} from "../db/driver";
import {RaceController} from "../controller/race.controller";
import {ConfigDatabase} from "../db/config";
import {ConfigRoutes} from "./routes/config.routes";
import https from "https";
import fs from "fs";

export class HttpServer {
    constructor(
        private port: number,
        private raceController: RaceController,
        public carsDatabase: CarsDatabase,
        public driversDatabase: DriverDatabase,
        public configDatabase: ConfigDatabase
    ) {
        this.app = express();
        this.config();
        this.raceRoutes.routes(this.app);
        this.userRoutes.routes(this.app);
        this.carRoutes.routes(this.app);
        this.configRoutes.routes(this.app);
    }

    public app: express.Application;
    public raceRoutes: RaceRoutes = new RaceRoutes(this.raceController);
    public userRoutes: UserRoutes = new UserRoutes(this.driversDatabase, this.carsDatabase);
    public carRoutes: CarRoutes = new CarRoutes(this.carsDatabase);
    public configRoutes: ConfigRoutes = new ConfigRoutes(this.configDatabase);

    private config(): void {
        this.app.use(cors({
            origin: "http://localhost:4200"
        }));
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended: false}));
    }

    public run() {
        //load certs and key.
        const options = {
            key: fs.readFileSync("laptimer.key"),
            cert: fs.readFileSync("laptimer.crt")
        };

        this.app.listen(this.port, '0.0.0.0', () => {
            console.log(`server started on port: ${this.port}`);
        });

        https.createServer(options, this.app).listen(8080);
    }
}
