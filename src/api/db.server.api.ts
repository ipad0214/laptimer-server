import axios from "axios";

export class DbServerApi {
    constructor(private port: number) {}

    private baseUrl: string = `http://localhost:${this.port}`;

    public get(route: string, params: any): Promise<any> {
        return new Promise<any> ((resolve, reject) => {
            axios.get(`${this.baseUrl}/${route}`, { params: params}).then((result) => {
                resolve(result.data);
            });
        });
    }

    public post(route: string, model: any): Promise<any> {
        return new Promise<any> ((resolve, reject) => {
            axios.post(`${this.baseUrl}/${route}`, model).then((result) => {
                resolve(result.data);
            });
        });
    }
}