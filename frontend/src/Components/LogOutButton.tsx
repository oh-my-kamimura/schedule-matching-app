import { 
	TouchableOpacity, Text, 
	Alert, StyleSheet 
} from "react-native";
import { signOut } from "firebase/auth";
import { router } from "expo-router";

import { auth } from "../config";

function LogOutButton () {

	const handlePress = (): void => {
		signOut(auth)
			.then(() =>  {
				router.replace('/Auth/LogInScreen')
			})
			.catch(() => {
				Alert.alert('ログアウトに失敗しました')
			})
	}

	return (
		<TouchableOpacity onPress={handlePress}>
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