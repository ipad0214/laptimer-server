import { DatabaseEngine } from "./database.engine"
import { ConfigModel } from "../models/config.model";


export class ConfigDatabase extends DatabaseEngine {
    constructor() {
        super("./db_files/config.db");
    }

    public insert(config: ConfigModel): Promise<boolean> {
        return new Promise<boolean>(async (resolve, reject) => {
            config.id = await this.createAutoIncrementId();
            this.db.insert(config, (err, dataSets) => {
                if(err !== null) {
                    reject(false);
                }

                console.log(dataSets);
                resolve(true);
            });
        });
    }

    public load(): Promise<ConfigModel> {
        return new Promise<ConfigModel> ((resolve, reject) => {
            this.db.findOne({id: 0}, (err, doc) => {
                if(err !== null) {
                    return reject(new ConfigModel());
                }

                resolve(doc);
            });
        });
    }

    public delete(): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            this.db.remove(0, {}, (err, removedSets) => {
                if(err != null) {
                    reject(false);
                    return;
                }

                resolve(true);
            });
        });
    }
}
