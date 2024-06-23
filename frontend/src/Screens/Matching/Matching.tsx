import { StyleSheet, Text, View, Button } from 'react-native';
import Header from '../../Elements/Header';

function MatchingScreen() {
	return (
		<View style={{ flex: 1 }}>
			<Header title="日程調整" />
			<View style={styles.container}>
				<Text>日程調整画面です</Text>
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

export default MatchingScreen