import { DatabaseEngine } from "./database.engine"
import { DriverModel } from "../models/driver.model";


export class CarsDatabase extends DatabaseEngine {
    constructor() {
        super("./db_files/drivers");
    }

    public insert(car: DriverModel): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            this.db.insert(car, (err, datasets) => {
                if(err !== null) {
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
                if(err !== null) {
                    return reject(new Array<DriverModel>());
                }
                let datasets = new Array<DriverModel>();
                datasets = docs;
                resolve(datasets);
            });
        });
    }

    public delete(id: number): Promise<boolean> {        
        return new Promise<boolean>((resolve, reject) => {
            this.db.remove(id, {}, (err, removedSets) => {
                if(err != null) {
                    reject(false);
                    return;
                }
                
                console.log(removedSets);
                resolve(true);
            });
        });
    }
}
