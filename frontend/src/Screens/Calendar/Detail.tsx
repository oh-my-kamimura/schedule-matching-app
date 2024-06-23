import { StyleSheet, Text, View } from 'react-native';
import Header from '../../Elements/Header';

function DetailScreen() {
	return (
		<View style={{ flex: 1 }}>
			<Header title="詳細ページ" />
			<View style={styles.container}>
				<Text>日程の詳細画面です</Text>
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

export default DetailScreen