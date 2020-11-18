import { Area } from './area.model';

export class User {

    constructor(
        public id: number, 
        public name: string,
        public profileImageUrl: string,
        public missionStartDate: Date,
        public missionEndDate: Date,
        public missionId: number,
        public areas: Area[]
    ) {}
}