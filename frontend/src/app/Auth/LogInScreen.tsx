import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Link, router } from 'expo-router'
import { Provider as PaperProvider } from 'react-native-paper';
import { TextInput, Button } from 'react-native-paper';
import { signInWithEmailAndPassword } from 'firebase/auth';

import Header from '../../Elements/Header';
import { auth } from '../../config';

function LogInScreen() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handlePress = (email: string, password: string): void => {
		console.log(email, password);
		signInWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				console.log(userCredential.user.uid)
				router.replace('Calendar/CalendarScreen')
			})
			.catch((error) => {
				const { code, message } = error
				console.log(code, message)
				Alert.alert(message)				
			})
	}

	return (
		<View style={styles.container}>
			<Header title="ログイン" right=""/>
			<PaperProvider>
				<TextInput
					label="メールアドレス"
					mode="outlined"
					style={styles.textInput}
					activeOutlineColor='#4B8687'
					value={email}
					onChangeText={setEmail}
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
					value={password}
					onChangeText={setPassword}
					secureTextEntry
					placeholder="パスワードを入力してください"
					placeholderTextColor='#AAAAAA'
					textContentType='password'
					autoCapitalize='none'
				/>
				<Button
					mode="contained"
					onPress={() => { handlePress(email, password) }}
					style={styles.button}
				>
					ログイン
				</Button>

				<View style={styles.footer}>
					<Text style={styles.footerText}>会員登録がまだの方は</Text>
					<Link href='/Auth/SignUpScreen' asChild replace>
						<TouchableOpacity>
							<Text style={styles.footerLink}>こちら</Text>
						</TouchableOpacity>
					</Link>
				</View>
			</PaperProvider>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	textInput: {
		justifyContent: 'center',
		marginTop: 10,
		marginHorizontal: 20,
	},
	button: {
		justifyContent: 'center',
		alignSelf: 'center',
		backgroundColor: '#4B8687',
		marginTop: 30,
		width: 200,
	},
	footer: {
		flexDirection: 'row',
		marginTop: 20,
		justifyContent: 'center',
		alignItems: 'center'
	},
	footerText: {
		fontSize: 14,
		lineHeight: 24,
		marginRight: 4,
		color: '#222222'
	},
	footerLink: {
		fontSize: 14,
		lineHeight: 24,
		color: '#467FD3'
	}
});

export default LogInScreen
