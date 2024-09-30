import { TouchableOpacity, Text, StyleSheet } from "react-native";

function LogOutButton () {
	return (
		<TouchableOpacity>
			<Text style={styles.text}>ログアウト</Text>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	text: {
		fontSize: 13,
	}
})

export default LogOutButton