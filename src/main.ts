import { HttpServer } from './express/http.server';
import { RaceController } from "./controller/race.controller";
import { CarsDatabase } from "./db/cars";
import { DriverDatabase } from "./db/driver";
import { ConfigDatabase } from "./db/config";

const PORT_HTTP = 4713;

class Main {
    private httpServer: HttpServer;
    private carsDatabase: CarsDatabase = new CarsDatabase();
    private driversDatabase: DriverDatabase = new DriverDatabase();
    private configDatabase: ConfigDatabase = new ConfigDatabase();
    private raceController: RaceController = new RaceController(this.carsDatabase, this.driversDatabase);

    constructor() {
        this.httpServer = new HttpServer(PORT_HTTP, this.raceController, this.carsDatabase, this.driversDatabase, this.configDatabase);
    }

    public run() {
        this.httpServer.run();
    }
}

const main = new Main();
main.run();
