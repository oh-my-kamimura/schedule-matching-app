import { StyleSheet, Text, View, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Header from '../../Elements/Header';
import ScheduleCalendar from '../../Components/ScheduleCalendar';

type RootStackParamList = {
	Calendar: undefined;
	Detail: undefined;
};

type CalendarScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Calendar'>;

function CalendarScreen() {
	const navigation = useNavigation<CalendarScreenNavigationProp>();
	return (
		<View style={{ flex: 1 }}>
			<Header title="カレンダー" />
			<View>
				<ScheduleCalendar/>
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