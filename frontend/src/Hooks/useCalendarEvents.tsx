import { useMemo, useState, useEffect } from 'react';
import dayjs from 'dayjs';
import ja from 'dayjs/locale/ja';
import { useRecoilState } from 'recoil';

import Schedule from '../Types/Schedule';
import CalendarItem from '../Types/CalendarItem';
import { fetchEventsInDatabase } from '../Services/scheduleService';
import calendarMap from '../Types/CalendarMap';
import { calendarEventsAtom } from '../Recoil/Atom/calendarEventAtom';

export const dateFormat = (date: Date) => dayjs(date).locale(ja).format('YYYY-MM-DD');

export const useCalendarEvents = () => {
  const [calendarEvents, setCalendarEvents] = useRecoilState(calendarEventsAtom);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const fetchEvents = async () => {
    try {
      const data = await fetchEventsInDatabase();
      if (Array.isArray(data)) {
        setCalendarEvents(data);
        setIsLoaded(true);
      }
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const eventItems = useMemo(() => {
    if (calendarEvents.length === 0) return new Map<string, CalendarItem[]>();
    const result = new Map<string, CalendarItem[]>();
    calendarEvents.map((event, i) => {
      const dayKey = dateFormat(event.startDate);
      const diff = dayjs(event.endDate).diff(event.startDate, 'day') + 1;
      if (diff == 1) {
        const currentData = result.get(dayKey);
        const maxIndex = currentData?.reduce((p, c) => Math.max(p, c.index), 0);
        result.set(dayKey, [
          ...(currentData ?? []),
          {
            id: event.id,
            index: maxIndex != undefined ? maxIndex + 1 : 0,
            color: event.calendar ? calendarMap[event.calendar][1] : 'gray',
            text: event.title,
            type: 'all',
          },
        ]);
      } else {
        let index: null | number = null;
        Array(diff)
          .fill(null)
          .map((_, i) => {
            const date = dateFormat(dayjs(new Date(dayKey)).add(i, 'day').toDate()); // 例: 予定が 12/1 ~ 12/4 の場合、12/1, 12/2, 12/3, 12/4となる
            const currentData = result.get(date);
            if (index == null) index = currentData?.length ?? 0;
            result.set(date, [
              ...(currentData ?? []),
              {
                id: event.id,
                index,
                color: event.calendar ? calendarMap[event.calendar][1] : 'gray',
                text: event.title,
                type: i == 0 ? 'start' : i == diff - 1 ? 'end' : 'between',
              },
            ]);
          });
      }
    });
    return result;
  }, [calendarEvents]);

  return { 
    eventItems,
    calendarEvents,
    setCalendarEvents,
  };
};