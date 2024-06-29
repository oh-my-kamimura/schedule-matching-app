import { StyleSheet, Text, View, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Header from '../../Elements/Header';

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
			<View style={styles.container}>
				<Text>カレンダー画面です。</Text>
				<Button
					title="詳細へ"
					onPress={() => navigation.navigate('Detail')}
				/>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#ddd',
		alignItems: 'center',
		justifyContent: 'center',
	},
});

export default CalendarScreen