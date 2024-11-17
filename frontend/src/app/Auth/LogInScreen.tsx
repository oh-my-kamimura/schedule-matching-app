import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { router } from 'expo-router'
import { TextInput, Button } from 'react-native-paper';

import BackButton from '../../Components/BackButton';
import { useLogInAccount } from '../../Hooks/useLogInAccount';

function LogInScreen() {
	const { userData, setUserData, logInAccount, loading, error } = useLogInAccount();

	const handleUserData = (field: string, value: string) => {
		setUserData((prevState) => ({
			...prevState,
			[field]: value,
		}));
	};

	const handlePress = (email: string, password: string): void => {
		console.log("--------------------");
		console.log("--------------------");
		console.log("ログイン処理を開始しました。");
		console.log(email, password);
		logInAccount()
			.then((result: void | Error) => {
				if (result instanceof Error) {
					Alert.alert("ログイン情報が正しくありません。");
					return;
				}
				console.log("--------------------");
				console.log("ログイン処理が完了しました。");
				console.log("userData: ", userData);
				router.replace('Calendar/CalendarScreen')
			})
	}

	return (
		<View style={styles.container}>
			<BackButton route='' />
			<Text style={styles.title}>
				ログイン
			</Text>
			<Text style={styles.description}>
				メールアドレスとパワードを入力してください
			</Text>
			<TextInput
				label="メールアドレス"
				mode="outlined"
				style={styles.textInput}
				activeOutlineColor='#4B8687'
				value={userData.email}
				onChangeText={(text) => handleUserData('email', text)}
				placeholder="メールアドレスを入力してください"
				placeholderTextColor='#AAAAAA'
				keyboardType='email-address'
				textContentType='emailAddress'
				autoCapitalize='none'
			/>
			<TextInput
				label="パスワード"
				mode="outlined"
				style={styles.textInput}
				activeOutlineColor='#4B8687'
				value={userData.password}
				onChangeText={(text) => handleUserData('password', text)}
				secureTextEntry
				placeholder="パスワードを入力してください"
				placeholderTextColor='#AAAAAA'
				textContentType='password'
				autoCapitalize='none'
			/>
			<TouchableOpacity onPress={() => { handlePress(userData.email, userData.password) }}>
				<Button
					mode="contained"
					style={styles.button}
				>
					ログイン
				</Button>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#EEEEEE',
		alignItems: 'center'
	},
	title: {
		marginTop: 226,
		width: 290,
		textAlign: 'left',
		fontSize: 23,
		fontWeight: 'bold',
		color: '#4B8687'
	},
	description: {
		marginTop: 10,
		marginBottom: 15,
		width: 290,
		textAlign: 'left',
		fontSize: 14,
		color: '#4B8687'
	},
	textInput: {
		marginTop: 15,
		width: 305,
	},
	button: {
		justifyContent: 'center',
		alignSelf: 'center',
		backgroundColor: '#EB8434',
		marginTop: 40,
		width: 200,
		height: 45,
		borderRadius: 22.5
	},
});

export default LogInScreen
