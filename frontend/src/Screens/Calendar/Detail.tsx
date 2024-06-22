import { StyleSheet, Text, View} from 'react-native';

function DetailScreen() {
	return (
		<View style={styles.container}>
			<Text>日程の詳細画面です</Text>
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