import { DatabaseEngine } from "./database.engine"
import { CarModel } from "./../models/car.model"

export class CarsDatabase extends DatabaseEngine {
    constructor() {
        super("./db_files/cars");
    }

    public insert(car: CarModel): Promise<boolean> {
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
