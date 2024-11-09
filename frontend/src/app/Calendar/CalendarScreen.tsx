import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import Header from '../../Elements/Header';
import ScheduleCalendar from '../../Components/ScheduleCalendar';
import { Ionicons } from '@expo/vector-icons';

function CalendarScreen() {
	return (
		<View style={{ flex: 1 }}>
			<Header title="カレンダー" />
			<View style={{ flex: 0.9 }}>
				<ScheduleCalendar/>
			</View>
				<TouchableOpacity style={{ position: 'absolute', bottom: 30, right: 20 }} onPress={() => router.replace('Calendar/AddScheduleScreen')}>
					<Ionicons name="add-circle" size={80} color="#EB8434" />
				</TouchableOpacity>
		</View>
	)
}

export default CalendarScreen