import { useMemo, useState, useEffect } from 'react';
import dayjs from 'dayjs';
import ja from 'dayjs/locale/ja';

import Schedule from '../Types/Schedule';
import CalendarItem from '../Types/CalendarItem';
import { fetchEventsInDatabase } from '../Services/scheduleService';

export const dateFormat = (date: Date) => dayjs(date).locale(ja).format('YYYY-MM-DD');

export const useCalendarEvents = () => {
  const [events, setEvents] = useState<Schedule[]>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const fetchEvents = async () => {
    try {
      const data = await fetchEventsInDatabase();
      if (Array.isArray(data)) {
        setEvents(data);
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
    if (events.length === 0) return new Map<string, CalendarItem[]>();
    const result = new Map<string, CalendarItem[]>();
    events.map((event, i) => {
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
            color: '#A3D10C', // 仮で設定中（event.colorに修正）
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
                color: '#BC95E3', // 仮で設定中（event.colorに修正）
                text: event.title,
                type: i == 0 ? 'start' : i == diff - 1 ? 'end' : 'between',
              },
            ]);
          });
      }
    });
    return result;
  }, [events]);

  return { eventItems };
};