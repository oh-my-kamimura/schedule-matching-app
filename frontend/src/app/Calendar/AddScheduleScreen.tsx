import { Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Header from '../../Elements/Header';
import { TextInput, Button } from 'react-native-paper';
import { useEffect, useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';

function AddScheduleScreen() {
	const [title, setTitle] = useState('');
	const [memo, setMemo] = useState('');
	const [startDate, setStartDate] = useState(new Date());
	const [endDate, setEndDate] = useState(new Date());
	const [startDatePickerVisible, setStartDatePickerVisible] = useState<boolean>(false);
	const [endDatePickerVisible, setEndDatePickerVisible] = useState<boolean>(false);
	const [formattedStartDate, setFormattedStartDate] = useState<string>('開始日時');
	const [formattedEndDate, setFormattedEndDate] = useState<string>('終了日時');
	const timeOptions: Intl.DateTimeFormatOptions = {
		hour: '2-digit',
		minute: '2-digit',
	};
	
	const formatTime = (date: Date): string => {
		const minutes = date.getMinutes();
		const roundedMinutes = Math.round(minutes / 10) * 10;
		date.setMinutes(roundedMinutes);
		return date.toLocaleTimeString('ja-JP', timeOptions);
	};
	
	useEffect(() => {
		setFormattedStartDate(formatTime(startDate));
	}, [startDate]);
	
	useEffect(() => {
		setFormattedEndDate(formatTime(endDate));
	}, [endDate]);


	const handleRegister = (): void => {

	};

	const onStartDateChange = (event: any, selectedDate: Date | undefined) => {
		const currentDate = selectedDate || startDate;
		setStartDatePickerVisible(Platform.OS === 'ios');
		setStartDate(currentDate);
	};

	const onEndDateChange = (event: any, selectedDate: Date | undefined) => {
		const currentDate = selectedDate || endDate;
		setEndDatePickerVisible(Platform.OS === 'ios');
		setEndDate(currentDate);
	};


	return (
		<View style={{ flex: 1 }}>
			<Header title="予定追加ページ" />
			<View style={styles.container}>
				<ScrollView>
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
					label="開始日時"
					mode="outlined"
					style={styles.textInput}
					activeOutlineColor='#4B8687'
					value={startDate.toLocaleDateString('ja-JP', timeOptions)}
					onPress={() => setStartDatePickerVisible(true)}
					keyboardType='default'
					autoCapitalize='none'
					editable={false}
					/>
					{startDatePickerVisible && 
					    <View>
							<DateTimePicker
							value={startDate}
							mode="datetime"
							display="spinner"
							minuteInterval={10}
							onChange={onStartDateChange}
							locale="ja-JP"
							style={styles.dateInput}
							/>
							<Button
							mode="contained"
							onPress={() => { setStartDatePickerVisible(false) }}
							style={styles.button}
							>
							決定する
							</Button>
						</View>
					}
					<TextInput
					label="終了日時"
					mode="outlined"
					style={styles.textInput}
					activeOutlineColor='#4B8687'
					value={endDate.toLocaleDateString('ja-JP', timeOptions)}
					onPress={() => setEndDatePickerVisible(true)}
					keyboardType='default'
					autoCapitalize='none'
					editable={false}
					/>
					{endDatePickerVisible && 
						<View>
							<DateTimePicker
							value={endDate}
							mode="datetime"
							display="spinner"
							minuteInterval={10}
							onChange={onEndDateChange}
							locale="ja-JP"
							style={styles.dateInput}
							/>
							<Button
							mode="contained"
							onPress={() => { setEndDatePickerVisible(false) }}
							style={styles.button}
							>
							決定する
							</Button>
						</View>
					}		
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
				</ScrollView>
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
	dateInput: {
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
});

export default AddScheduleScreen;
