import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native'; // Import the 'Text' component from 'react-native'
import { Calendar, LocaleConfig } from 'react-native-calendars';

LocaleConfig.locales.jp = {
    monthNames: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
    monthNamesShort: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
    dayNames: ['日曜日', '月曜日', '火曜日', '水曜日', '木曜日', '金曜日', '土曜日'],
    dayNamesShort: ['日', '月', '火', '水', '木', '金', '土'],
  };
LocaleConfig.defaultLocale = 'jp';

const handleDayPress = (day: { dateString: string } | undefined) => {
  //monthも取得したい場合は、day.dateStringをnew Date()でDateオブジェクトに変換してから取得する
  console.log(day);
};


export default function ScheduleCalendar() {
  return (
    <View>
      <Calendar 
        style = {{ 
          height: '100%',
        }}
        dayComponent={({ date, state }: { date: any; state: any }) => {
            const currentDate = new Date();
            return (
              <TouchableOpacity onPress={() => handleDayPress(date)}>
              <View style={{ height: 80, width: 50, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color:'black' }}>{date && date.day}</Text>
              </View>
              </TouchableOpacity>
            );
        }}
      />
    </View>
  )
}