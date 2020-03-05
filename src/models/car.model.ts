export class CarModel {
    constructor(public name: string = "", public id: number = 0) {}

    public manufacturer: string = "";
    public img: string = "";
    public drift: number = 0;
    public steering: number = 0;
    public speed: number = 0;
    public accelration: number = 0;
}