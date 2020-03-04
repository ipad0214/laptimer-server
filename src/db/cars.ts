import { DatabaseEngine } from "./database.engine"

export class CarsDatabase extends DatabaseEngine {
    constructor() {
        super("db_files/cars");
        this.db.loadDatabase((err) => {
            console.log(err);        });
    }

    public insert() {
        this.db.insert([{
            id: 0,
            name: "f1 2004",
            manufacturer: "Ferrari",
            img: "oipsjdgpoijasdipogjaoisdgjioasdjgoijasdoigjoiasdjgoiasdjgoijasdgiojasiodjgoiasdjgoasjeoig"
        }]);
    }

    public find(obj: any) {
        this.db.find(obj, (err, docs) => {
            console.log(docs);
        });
    }

}