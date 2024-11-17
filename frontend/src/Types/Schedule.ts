type Schedule = {
    id: string;
    calendar: 'home' | 'work' | 'outdoor';
    title: string;
    isAllDay: boolean;
    startDate: Date;
    endDate: Date;
    color: string;
    allowConflict: boolean;
    memo: string;
}

export default Schedule;