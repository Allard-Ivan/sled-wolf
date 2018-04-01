export class WeekReport {
    constructor(
        private _id: string,
        private dayOfWeek: string,
        private workContent: string,
        private workType: string,
        private complexiy: string,
        private workingHours: number,
        private completion: string
    ) { }
}