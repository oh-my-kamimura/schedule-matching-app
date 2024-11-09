import React, { useMemo, useState } from 'react';
import { View, useColorScheme } from 'react-native';
import { CalendarList, LocaleConfig } from 'react-native-calendars';
import { ScheduleCalendarDayItem } from './ScheduleCalendarDayItem';
import { Theme as CalendarTheme } from 'react-native-calendars/src/types';
import { useCalendarEvents } from '../Hooks/useCalendarEvents';

LocaleConfig.locales.jp = {
    monthNames: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
    monthNamesShort: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
    dayNames: ['日曜日', '月曜日', '火曜日', '水曜日', '木曜日', '金曜日', '土曜日'],
    dayNamesShort: ['日', '月', '火', '水', '木', '金', '土'],
  };
LocaleConfig.defaultLocale = 'jp';

const PAST_RANGE = 24;
const FUTURE_RANGE = 24;

export default function ScheduleCalendar() {
  const [selected, setSelected] = useState('');
  const { eventItems } = useCalendarEvents();
  const theme = useColorScheme();
  const cellMinHeight = 58;

  const calendarTheme: CalendarTheme = useMemo(
    () => ({
      monthTextColor: '#000',
      textMonthFontWeight: 'bold',
      calendarBackground: 'white',
      arrowColor: '#0000ff',
    }),
    [theme],
  );

  const handleDayPress = (day: { dateString: string } | undefined) => {
    console.log('on press day', day?.dateString);
    if (day?.dateString) {
      setSelected(day.dateString);
    }
    else {
      console.log("日付がセットされませんでした");
    }
  };
  
  return (
    <View style={{flex: 1}}>
      <CalendarList
        key={theme}
        pastScrollRange={PAST_RANGE}
        futureScrollRange={FUTURE_RANGE}
        firstDay={1}
        showSixWeeks={false}
        hideExtraDays={false}
        monthFormat="yyyy年 M月"
        dayComponent={
          (day) => {
            return(
              <ScheduleCalendarDayItem 
                {...day} 
                eventItems={eventItems} 
                cellMinHeight={cellMinHeight} 
                {...(day.date?.dateString === selected ? { state: 'selected' } : {})}
                onPress={() => {
                  handleDayPress(day.date);
                }}
              />
            )
          }
        }
        markingType="custom"
        theme={calendarTheme}
        horizontal={true}
        hideArrows={false}
        pagingEnabled={true}
      />
    </View>
  )
}