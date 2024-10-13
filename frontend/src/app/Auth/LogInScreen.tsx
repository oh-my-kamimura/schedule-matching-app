import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { router } from 'expo-router'
import { TextInput, Button } from 'react-native-paper';
import { signInWithEmailAndPassword } from 'firebase/auth';

import BackButton from '../../Components/BackButton';
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
			<BackButton></BackButton>
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
			<TouchableOpacity onPress={() => { handlePress(email, password) }}>
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
