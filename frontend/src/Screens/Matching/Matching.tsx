import { StyleSheet, Text, View, Button } from 'react-native';

function MatchingScreen() {
	return (
		<View style={styles.container}>
			<Text>日程調整画面です</Text>
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