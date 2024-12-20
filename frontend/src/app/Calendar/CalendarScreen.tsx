import { View, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import Header from '../../Elements/Header';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';

import ScheduleCalendar from '../../Components/ScheduleCalendar';
import ScheduleCalendarDayDetail from '../../Components/ScheduleCalendarDayDetail';
import { useCalendarEvents } from '../../Hooks/useCalendarEvents';

function CalendarScreen() {
	const { eventItems } = useCalendarEvents();
	const [currentYearMonth, setCurrentYearMonth] = useState('');

	return (
		<View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
			<Header title={currentYearMonth} />
			<View style={{ flex: 0.83 }}>
				<ScheduleCalendar onMonthChange={setCurrentYearMonth}/>
			</View>
			<View style={{ flex: 0.17 }}>
				<ScheduleCalendarDayDetail eventItems={eventItems}/>
			</View>
			<TouchableOpacity style={{ position: 'absolute', bottom: 116, right: 18 }} onPress={() => router.replace('Calendar/AddScheduleScreen')}>
				<Ionicons name="add-circle" size={80} color="#EB8434" />
			</TouchableOpacity>
		</View>
	)
}

export default CalendarScreen