import { RaceWebSocket } from './websocket/websocket';
import { HttpServer } from './express/http.server';
import { RaceController } from "./controller/race.controller";
import { CarsDatabase } from "./db/cars";
import { DriverDatabase } from "./db/driver";
import {ConfigDatabase} from "./db/config";

const PORT_HTTP = 4713;
const PORT_WSS = 4712;

class Main {
    private readonly raceWebSocket: RaceWebSocket;
    private httpServer: HttpServer;
    private carsDatabase: CarsDatabase = new CarsDatabase();
    private driversDatabase: DriverDatabase = new DriverDatabase();
    private configDatabase: ConfigDatabase = new ConfigDatabase();
    private raceController: RaceController = new RaceController(this.raceWebSocket, this.carsDatabase, this.driversDatabase);

    constructor() {
        this.raceWebSocket = new RaceWebSocket(PORT_WSS);
        this.httpServer = new HttpServer(PORT_HTTP, this.raceController, this.carsDatabase, this.driversDatabase, this.configDatabase);
    }

    public run() {
        this.httpServer.run();
        console.log("waiting for websocket");
    }
}

const main = new Main();
main.run();
