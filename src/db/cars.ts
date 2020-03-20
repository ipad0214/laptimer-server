import { DatabaseEngine } from "./database.engine"
import { CarModel } from "../models/car.model"
import {DriverModel} from "../models/driver.model";

export class CarsDatabase extends DatabaseEngine {
    constructor() {
        super("./db_files/cars.db");
    }

    public async insert(car: CarModel): Promise<boolean> {
        return new Promise<boolean>(async (resolve, reject) => {
            car.id = await this.createAutoIncrementId();
            this.db.insert(car, (err, dataSets) => {
                if(err !== null) {
                    reject(false);
                }
                resolve(dataSets);
            });
        });
    }

    public find(obj: any): Promise<Array<CarModel>> {
        return new Promise<Array<CarModel>>((resolve, reject) => {
            this.db.find(obj, (err, docs) => {
                if(err !== null) {
                    return reject(new Array<CarModel>());
                }
                let datasets: CarModel[] = docs;
                resolve(datasets);
            });
        })
    }

    public single(obj: any): Promise<CarModel> {
        return new Promise<CarModel> ((resolve, reject) => {
            this.db.findOne(obj, (err, doc) => {
                if(err !== null) {
                    return reject(new CarModel());
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
                
                console.log(removedSets);
                resolve(true);
            });
        });
    }
}
