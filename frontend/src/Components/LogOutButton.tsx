import {
	TouchableOpacity, Text,
	Alert, StyleSheet
} from "react-native";
import { signOut } from "firebase/auth";
import { router } from "expo-router";

import { auth } from "../config";
import { userDataAtom } from '../Recoil/Atom/userDataAtom';
import { useRecoilState } from "recoil";

function LogOutButton() {

	const [userData, setUserData] = useRecoilState(userDataAtom);

	const resetUserData = () => {
		setUserData((prevState) => ({
			...prevState,
			userName: "",
			email: "",
			password: "",
			imagePath: "",
			imageDownloadURL: "",
			friendsList: [""],
		}));
	};

	const handlePress = (): void => {
		signOut(auth)
			.then(() => {
				resetUserData();
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