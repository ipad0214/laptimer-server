import express from "express"
import * as bodyParser from "body-parser"
import { RaceRoutes } from './routes/race.routes';
import { UserRoutes } from './routes/user.routes';
import { CarRoutes } from './routes/cars.routes';
import { DbServerApi } from '../api/db.server.api';


export class HttpServer {    
    constructor(
        private port: number, 
        private websocket: any,
        private dbServerApi: DbServerApi
        ) {
        this.app = express();
        this.config();
        this.raceRoutes.routes(this.app, this.websocket);
        this.userRoutes.routes(this.app, this.dbServerApi);
        this.carRoutes.routes(this.app, this.dbServerApi);
    }

    public app: express.Application;
    public raceRoutes: RaceRoutes = new RaceRoutes();
    public userRoutes: UserRoutes = new UserRoutes();
    public carRoutes: CarRoutes = new CarRoutes();

    private config(): void {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }

    public run() {
        this.app.listen(this.port, () => {
            console.log("server started");
        });
    }
}