type CalendarItem = {
  id: string;
  index: number;
  color: string;
  text: string;
  type: "start" | "between" | "end" | "all";
};

export default CalendarItem;