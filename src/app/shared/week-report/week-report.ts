export class WeekReport {
    constructor(
        public key: string,
        public dayOfWeek: string,
        public workContent: string,
        public workType: string,
        public complexiy: string,
        public workingHours: number,
        public completion: string,
        public weekIndex: number
    ) { }
}