import { RaceWebSocket } from './websocket/websocket';
import { HttpServer } from './express/http.server';
import {RaceController} from "./controller/race.conntroller";

const PORT_HTTP = 4713;
const PORT_WSS = 4712;

class Main {
    private readonly raceWebSocket: RaceWebSocket;
    private httpServer: HttpServer;
    private raceController: RaceController = new RaceController(this.raceWebSocket);

    constructor() {
        this.raceWebSocket = new RaceWebSocket(PORT_WSS);
        this.httpServer = new HttpServer(PORT_HTTP, this.raceController);
    }

    public run() {
        this.httpServer.run();
        console.log("waiting for websocket");
    }
}

const main = new Main();
main.run();
