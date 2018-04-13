enum MonthDays {
    averageYear = 28,
    LeapYear = 29,
    MinMonth = 30,
    MaxMonth = 31,
}

export class Constants {
    public static January: number = MonthDays.MaxMonth;
    public static February: number = 
        new Date().getFullYear() % 4 == 0 ? MonthDays.LeapYear : MonthDays.averageYear;
    public static March: number = MonthDays.MaxMonth;
    public static April: number = MonthDays.MinMonth;
    public static May: number = MonthDays.MaxMonth;
    public static June: number = MonthDays.MinMonth;
    public static July: number = MonthDays.MaxMonth;
    public static August: number = MonthDays.MaxMonth;
    public static September: number = MonthDays.MinMonth;
    public static October: number = MonthDays.MaxMonth;
    public static November: number = MonthDays.MinMonth;
    public static December: number = MonthDays.MaxMonth;

    public static Months: number[] = [ Constants.January, Constants.February, Constants.March
        , Constants.April, Constants.May, Constants.June, Constants.July, Constants.August
        , Constants.September, Constants.October, Constants.November, Constants.December ];
}
