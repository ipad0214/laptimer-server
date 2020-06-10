const DataStore = require("nedb");

export class DatabaseEngine {
    public db: any;

    constructor(private filePath: String) {
        this.db = new DataStore({
            filename: this.filePath,
            autoload: true
        });

        this.db.loadDatabase((err) => {
        });
    }

    public createAutoIncrementId(): Promise<number> {
        return new Promise<number> ((resolve, reject) => {
            this.db.find({}).sort({ id: -1 }).limit(1).exec(function (err, docs) {
                if(err !== null) {
                    reject(false);
                    return;
                }

                if(docs.length === 0) {
                    resolve(0);
                    return;
                }
                resolve(docs[0].id + 1);
            });
        });
    }
}
