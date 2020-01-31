import { RaceWebSocket } from '../websocket/websocket';

export class RaceController {
    public raceProgress: number = 0;
    public raceLength: number = 10;
    public racerOne: string = "";
    public racerTwo: string = "";

    constructor(
        private websocket: RaceWebSocket
    ) {}
}