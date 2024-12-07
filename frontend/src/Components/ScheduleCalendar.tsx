import React, { useMemo, useState } from 'react';
import { View, useColorScheme } from 'react-native';
import { CalendarList, LocaleConfig } from 'react-native-calendars';
import { Theme as CalendarTheme } from 'react-native-calendars/src/types';

import { ScheduleCalendarDayItem } from './ScheduleCalendarDayItem';
import CalendarItem from '../Types/CalendarItem';

LocaleConfig.locales.jp = {
    monthNames: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
    monthNamesShort: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
    dayNames: ['日曜日', '月曜日', '火曜日', '水曜日', '木曜日', '金曜日', '土曜日'],
    dayNamesShort: ['日', '月', '火', '水', '木', '金', '土'],
  };
LocaleConfig.defaultLocale = 'jp';

const PAST_RANGE = 24;
const FUTURE_RANGE = 24;

export default function ScheduleCalendar({ onMonthChange, eventItems }: { onMonthChange: (month: string) => void, eventItems: Map<string, CalendarItem[]> }) {
  const theme = useColorScheme();
  const cellMinHeight = 64;

  const calendarTheme: CalendarTheme = useMemo(
    () => ({
      monthTextColor: '#000',
      textMonthFontWeight: 'bold',
      calendarBackground: 'transparent',
      arrowColor: '#0000ff',
    }),
    [theme],
  );
  
  return (
    <View style={{flex: 1}}>
      <CalendarList
        key={theme}
        pastScrollRange={PAST_RANGE}
        futureScrollRange={FUTURE_RANGE}
        firstDay={1}
        showSixWeeks={false}
        hideExtraDays={false}
        monthFormat=""
        onVisibleMonthsChange={(months) => {
          if (months.length > 0) {
            const { year, month } = months[0];
            const formattedMonth = `${year}年${month}月`;
            onMonthChange(formattedMonth);
          }
        }}
        headerStyle={{height:40, justifyContent:'center', paddingBottom:10}}
        dayComponent={
          (day) => {
            return(
              <ScheduleCalendarDayItem 
                {...day} 
                eventItems={eventItems} 
                cellMinHeight={cellMinHeight} 
              />
            )
          }
        }
        markingType="custom"
        theme={calendarTheme}
        horizontal={true}
        hideArrows={true}
        pagingEnabled={true}
      />
    </View>
  )
}