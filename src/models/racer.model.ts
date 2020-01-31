export class RacerModel {
    constructor(name?: string, profileId?: number) {
        this.name = name || "";
        this.profileId = profileId || 0;
    }

    public leader: boolean =  false;
    public rounds: number = 0;
    public car: number = 1;
    public profileId: number = 0;
    public name: string = "";
}