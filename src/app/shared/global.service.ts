import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Constants } from './constants';

@Injectable()
export class GlobalService {

    constructor(private router: Router) {
    }

    advancedSearch(termPrefix, termSuffix) {
        this.router.navigateByUrl('/multimedia/' + termPrefix + '/' + termSuffix);
    }

    getWeek(): number {
        const now: Date = new Date();
        let days: number = 0;
        const currentMonth = now.getMonth();
        let monthArray = Constants.Months;
        monthArray.splice(currentMonth, 12 - currentMonth);
        monthArray.forEach(month => {
            days += month;
        });
        const currentWeek = parseInt(((now.getDate() + days - 1) / 7).toString()) + 1;
        return currentWeek;
    }

    getWeeks(): string[] {
        const result: string[] = [];
        const currentWeek: number = this.getWeek();
        const currentYear: number = new Date().getFullYear();
        result.push('This Week');
        for (let i = currentWeek - 1; i > 0; i--) {
            result.push(currentYear + '-' + i);
        }
        return result;
    }
}