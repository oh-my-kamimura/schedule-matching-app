import {
	View, Text,
	Image, StyleSheet, TouchableOpacity
} from 'react-native';
import { router, Link } from 'expo-router';
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';
import { Button } from 'react-native-paper';

import { auth } from '../config';
import { useFetchAccountInfo } from '../Hooks/useFetchAccountInfo';

function Index() {

	const { fetchAccountInfo } = useFetchAccountInfo();

	useEffect(() =>
		onAuthStateChanged(auth, async (user) => {
			if (user !== null) {
				await fetchAccountInfo(user.uid);
				router.replace('/Calendar/CalendarScreen')
			}
		})
		, [])

	return (
		<View style={styles.container}>
			<Image style={styles.image} source={require('../../assets/images/top.png')} />
			<Text style={styles.title}>ラク調</Text>
			<Text style={styles.description}>
				日程調整のストレスをなくしましょう！{"\n"}
				カレンダーの登録内容から{"\n"}
				アプリが自動で最適な日程を提案します。{"\n"}
				無駄なやり取りはもう必要ありません！
			</Text>
			<TouchableOpacity onPress={() => { router.push('/Auth/SignUpScreen'); }}>
				<Button
					mode="contained"
					style={styles.signupButton}
				>
					はじめる
				</Button>
			</TouchableOpacity>
			<TouchableOpacity onPress={() => { router.push('/Auth/LogInScreen'); }}>
				<Text style={styles.loginLink}>
					すでに登録済みの方はこちら
				</Text>
			</TouchableOpacity>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#EEEEEE',
		alignItems: 'center',
	},
	image: {
		marginTop: 143,
		width: 200,
		height: 200
	},
	title: {
		marginTop: 30,
		fontFamily: 'Potta One Regular',
		fontSize: 28,
		color: '#555555'
	},
	description: {
		marginTop: 20,
		textAlign: 'center',
		fontSize: 14,
		lineHeight: 25,
		color: '#555555'
	},
	signupButton: {
		justifyContent: 'center',
		alignSelf: 'center',
		backgroundColor: '#4B8687',
		marginTop: 50,
		width: 240,
		height: 45,
		borderRadius: 22.5
	},
	loginLink: {
		marginTop: 20,
		color: '#4B8687'
	}
});

export default Index;