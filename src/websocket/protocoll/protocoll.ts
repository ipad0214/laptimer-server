import { REQUEST, POST } from './type';

export class LaptimerProtocoll {
    constructor(
        public payload: string = "",
        public type: string = REQUEST
    ) {}
}
