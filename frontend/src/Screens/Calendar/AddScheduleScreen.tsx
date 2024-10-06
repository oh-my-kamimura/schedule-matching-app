import { StyleSheet, Text, View } from 'react-native';
import Header from '../../Elements/Header';

function AddScheduleScreen() {
	return (
		<View style={{ flex: 1 }}>
			<Header title="予定追加ページ" />
			<View style={styles.container}>
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
	input: {
		borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        height: 40,
        width: 200,
        fontSize: 20,
	},
});

export default AddScheduleScreen