import { StyleSheet, Text, View, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Header from '../../Elements/Header';
import ScheduleCalendar from '../../Components/ScheduleCalendar';
import { Ionicons } from '@expo/vector-icons';

type RootStackParamList = {
	Calendar: undefined;
	AddSchedule: undefined;
};

type CalendarScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Calendar'>;

function CalendarScreen() {
	const navigation = useNavigation<CalendarScreenNavigationProp>();
	return (
		<View style={{ flex: 1 }}>
			<Header title="カレンダー" />
			<View>
				<ScheduleCalendar/>
				<View style={{ position: 'absolute', bottom: 80, right: 20 }}>
					<Ionicons name="add-circle" size={80} color="orange" onPress={() => navigation.navigate('AddSchedule')} />
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