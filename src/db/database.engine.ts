const DataStore = require("nedb");

export class DatabaseEngine {
    public db: any;

    constructor(private filePath: String) {
        this.db = new DataStore({
            filename: this.filePath,
            autoload: true
        })

        this.db.loadDatabase((err) => {
            console.log(err);        
        });
    }
}