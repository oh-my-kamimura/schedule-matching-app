import { StyleSheet, Text, View, Button } from 'react-native';
import { Link } from 'expo-router';
import Header from '../../Elements/Header';
import ScheduleCalendar from '../../Components/ScheduleCalendar';

function CalendarScreen() {
	return (
		<View style={{ flex: 1 }}>
			<Header title="カレンダー" />
			<View>
				<ScheduleCalendar/>
				<Text>カレンダー画面です。</Text>
				<Link href='/Calendar/DetailScreen'>
					<Button title="詳細へ" />
				</Link>
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