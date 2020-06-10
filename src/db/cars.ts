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
                resolve(true);
            });
        });
    }

    public update(id: number, obj: any): Promise<any> {
        return new Promise<any> ((resolve, reject) => {
            this.db.update(
                { id: id },
                { $set: {
                        name: obj.name,
                        model: obj.model,
                        manufacturer: obj.manufacturer,
                        steering: obj.steering,
                        speed: obj.speed,
                        acceleration: obj.acceleration,
                        drift: obj.drift
                    }},
                {},
                function(err, numReplaced) {
                    console.log("UPDATED: " + numReplaced);
                    resolve(numReplaced);
                }
            );
        });
    }
}
