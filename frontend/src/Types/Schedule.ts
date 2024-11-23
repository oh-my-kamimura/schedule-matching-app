type Schedule = {
    id: string;
    calendar: string;
    title: string;
    isAllDay: boolean;
    startDate: Date;
    endDate: Date;
    allowConflict: boolean;
    memo: string;
}

export default Schedule;