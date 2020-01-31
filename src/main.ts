import { RaceWebSocket } from './websocket/websocket';
import { HttpServer } from './express/http.server';
import { DbServerApi } from './api/db.server.api';

const PORT_HTTP = 4713;
const PORT_WSS = 4712;
const PORT_DB = 5000;

class Main {
    private raceWebSocket: RaceWebSocket;
    private httpServer: HttpServer;
    private dbServerApi: DbServerApi;

    constructor() {
        this.dbServerApi = new DbServerApi(PORT_DB);
        this.raceWebSocket = new RaceWebSocket(PORT_WSS);
        this.httpServer = new HttpServer(PORT_HTTP, this.raceWebSocket, this.dbServerApi);
    }

    public run() {
        this.httpServer.run();

        console.log("waiting for websocket");
    }
}

const main = new Main();
main.run();