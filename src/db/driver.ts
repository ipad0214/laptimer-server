import { DatabaseEngine } from "./database.engine"
import { DriverModel } from "../models/driver.model";


export class CarsDatabase extends DatabaseEngine {
    constructor() {
        super("db_files/drivers");
        this.db.loadDatabase((err) => {
            console.log(err);        });
    }

    public insert(car: DriverModel): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            this.db.insert(car, (err, datasets) => {
                if(err !== undefined) {
                    reject(false);
                }

                console.log(datasets);
                resolve(true);
            });
        });
    }

    public find(obj: any): Promise<Array<DriverModel>> {
        return new Promise<Array<DriverModel>>((resolve, reject) => {
            this.db.find(obj, (err, docs) => {
                if(err !== undefined) {
                    return reject(new Array<DriverModel>());
                }
                let datasets = new Array<DriverModel>();
                datasets = docs;
                resolve(datasets);
            });
        })
    }

    public delete(id: number): Promise<boolean> {        
        return new Promise<boolean>((resolve, reject) => {
            this.db.remove(id, {}, (err, removedSets) => {
                if(err != undefined) {
                    reject(false);
                    return;
                }
                
                console.log(removedSets);
                resolve(true);
            });
        });
    }
}