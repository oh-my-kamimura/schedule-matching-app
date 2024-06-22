import { StyleSheet, Text, View, Button } from 'react-native';

function FriendScreen() {
	return (
		<View style={styles.container}>
			<Text>友達登録画面です</Text>
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

export default FriendScreen