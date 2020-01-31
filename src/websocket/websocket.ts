import * as WebSocket from "ws";

export class RaceWebSocket {
    public wss: any;
    
    private clients: Array<any>;

    constructor(private port: number) {
        this.clients = new Array<any>();
        this.wss = new WebSocket.Server({ port: this.port});

        this.wss.on("connection", (ws, req) => {
            this.clients.push(ws);

            ws.on('close', () => {
                console.log("disconnected");
            });

            ws.on("message", () => {
                ws.send("you send something");
            });

        });
    }

    public send(msg: string): void {
        this.clients.forEach(element => {
            element.send(msg);
        });
    }
}