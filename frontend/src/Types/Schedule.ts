type Schedule = {
    calendar: 'home' | 'work' | 'outdoor';
    title: string;
    isAllDay: boolean;
    startDate: Date;
    endDate: Date;
    allowConflict: boolean;
    memo: string;
}

export default Schedule;