import { StyleSheet, Text, View } from 'react-native';
import Header from '../../Elements/Header';
import { Provider as PaperProvider } from 'react-native-paper';
import { TextInput, Button } from 'react-native-paper';
import { useState } from 'react';

function AddScheduleScreen() {
	const [title, setTitle] = useState('');
	const [date, setDate] = useState(new Date());
	const [open, setOpen] = useState(false);
	const [memo, setMemo] = useState('');



	const handleRegister = (): void => {

	};

	return (
		<View style={{ flex: 1 }}>
			<Header title="予定追加ページ" />
			<View style={styles.container}>
				<TextInput
				label="タイトル"
				mode="outlined"
				style={styles.textInput}
				activeOutlineColor='#4B8687'
				value={title}
				onChangeText={setTitle}
				placeholder="予定のタイトルを入力してください"
				placeholderTextColor='#AAAAAA'
				keyboardType='default'
				autoCapitalize='none'
				/>
				<TextInput
				label="メモ"
				mode="outlined"
				style={styles.memoInput}
				activeOutlineColor='#4B8687'
				value={memo}
				onChangeText={setMemo}
				placeholderTextColor='#AAAAAA'
				keyboardType='default'
				autoCapitalize='none'
				/>
				<Button
				mode="contained"
				onPress={() => { handleRegister() }}
				style={styles.button}
				>
				追加する
				</Button>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	textInput: {
		justifyContent: 'center',
		marginTop: 10,
		marginHorizontal: 20,
	},
	memoInput: {
		justifyContent: 'center',
		marginTop: 10,
		marginHorizontal: 20,
		height: 200,
	},
	button: {
		justifyContent: 'center',
		alignSelf: 'center',
		backgroundColor: '#4B8687',
		marginTop: 30,
		width: 200,
	},
});

export default AddScheduleScreen;
