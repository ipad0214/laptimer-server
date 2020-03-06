import express from "express"
import cors from "cors";
import * as bodyParser from "body-parser"
import { RaceRoutes } from './routes/race.routes';
import { UserRoutes } from './routes/user.routes';
import { CarRoutes } from './routes/cars.routes';
import {CarsDatabase} from "../db/cars";
import {DriverDatabase} from "../db/driver";
import {RaceController} from "../controller/race.conntroller";


export class HttpServer {    
    constructor(
        private port: number,
        private raceController: RaceController
        ) {
        this.app = express();
        this.config();
        this.raceRoutes.routes(this.app);
        this.userRoutes.routes(this.app);
        this.carRoutes.routes(this.app);
    }

    public carsDatabase: CarsDatabase = new CarsDatabase();
    public driversDatabase: DriverDatabase = new DriverDatabase();
    public app: express.Application;
    public raceRoutes: RaceRoutes = new RaceRoutes(this.raceController);
    public userRoutes: UserRoutes = new UserRoutes(this.driversDatabase, this.carsDatabase);
    public carRoutes: CarRoutes = new CarRoutes(this.carsDatabase);

    private config(): void {
        this.app.use(cors({
            origin: "http://localhost:4200"
        }));
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }

    public run() {
        this.app.listen(this.port, '0.0.0.0',() => {
            console.log(`server started on port: ${this.port}`);
        });
    }
}
