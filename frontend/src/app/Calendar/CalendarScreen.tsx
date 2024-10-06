import { StyleSheet, Text, View, Button } from 'react-native';
import { router } from 'expo-router';
import Header from '../../Elements/Header';
import ScheduleCalendar from '../../Components/ScheduleCalendar';
import { Ionicons } from '@expo/vector-icons';

function CalendarScreen() {
	return (
		<View style={{ flex: 1 }}>
			<Header title="カレンダー" />
			<View>
				<ScheduleCalendar/>
				  <View style={{ position: 'absolute', bottom: 120, right: 20 }}>
				    <Ionicons  name="add-circle" size={80} color="orange" onPress={() => router.replace('Calendar/AddScheduleScreen')}/>
				  </View>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});

export default CalendarScreen