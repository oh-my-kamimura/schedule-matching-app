import { StyleSheet, Text, View, Button } from 'react-native';
import Header from '../../Elements/Header';
import ScheduleCalendar from '../../Components/ScheduleCalendar';

type RootStackParamList = {
	Calendar: undefined;
	Detail: undefined;
};

function CalendarScreen() {
	return (
		<View style={{ flex: 1 }}>
			<Header title="カレンダー" />
			<View>
				<ScheduleCalendar/>
				<Text>カレンダー画面です。</Text>
				<Button
					title="詳細へ"
					// onPress={() => navigation.navigate('Detail')}
				/>
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