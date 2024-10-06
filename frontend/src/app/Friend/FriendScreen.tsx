import { StyleSheet, Text, View, Button } from 'react-native';
import Header from '../../Elements/Header';

function FriendScreen() {
	return (
		<View style={{ flex: 1 }}>
			<Header title="フレンド一覧" />
			<View style={styles.container}>
				<Text>友達登録画面です</Text>
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

export default FriendScreen