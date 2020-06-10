import { DatabaseEngine } from "./database.engine"
import { DriverModel } from "../models/driver.model";


export class DriverDatabase extends DatabaseEngine {
    constructor() {
        super("./db_files/drivers.db");
    }

    public insert(driver: DriverModel): Promise<boolean> {
        return new Promise<boolean>(async (resolve, reject) => {
            driver.id = await this.createAutoIncrementId();
            this.db.insert(driver, (err, dataSets) => {
                if(err !== null) {
                    reject(false);
                }
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
                resolve(docs);
            });
        });
    }

    public single(obj: any): Promise<DriverModel> {
        return new Promise<DriverModel> ((resolve, reject) => {
             this.db.findOne(obj, (err, doc) => {
                if(err !== null) {
                    return reject(new DriverModel());
                }

                resolve(doc);
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

                resolve(true);
            });
        });
    }
}
