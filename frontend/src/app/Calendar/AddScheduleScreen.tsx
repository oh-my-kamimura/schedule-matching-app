import { Platform, ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Header from '../../Elements/Header';
import { TextInput, Button } from 'react-native-paper';
import React, { useEffect, useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useForm, Controller } from 'react-hook-form';
import { addSchedule } from '../../Services/scheduleService';
import Schedule from '../../Types/Schedule';
import { router } from 'expo-router';
import BackButton from '../../Components/BackButton';
import { Dropdown, SelectCountry } from 'react-native-element-dropdown';


function AddScheduleScreen() {
    const [calendar, setCalendar] = useState('');
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

    const calendars = [
        {
          value: '1',
          label: 'Country 1',
          image: require('../../../assets/images/8FBC8B.png'),
        },
        {
          value: '2',
          label: 'Country 2',
          image: require('../../../assets/images/8FBC8B.png'),
        },
        {
          value: '3',
          label: 'Country 3',
          image: require('../../../assets/images/8FBC8B.png'),
        },
        {
          value: '4',
          label: 'Country 4',
          image: require('../../../assets/images/8FBC8B.png'),
        },
        {
          value: '5',
          label: 'Country 5',
          image: require('../../../assets/images/8FBC8B.png'),
        },
      ];

    const calendarColors: { [key: string]: string } = {
        'home': '#8FBC8B',
        'work': '#20B2AA',
        'outdoor': '#FFE944',
    };
    useEffect(() => {
        setFormattedStartDate(formatTime(startDate));
    }, [startDate]);
    
    useEffect(() => {
        setFormattedEndDate(formatTime(endDate));
    }, [endDate]);

    const { control, handleSubmit, formState: { errors }, setValue } = useForm<Schedule>({
        mode: 'onChange',
    });

    const onSubmit = async(schedule: Schedule) => {

        // スケジュールの詳細をログに表示
        console.log(`タイトル: ${schedule.title}`);
        console.log(`開始日時: ${schedule.startDate}`);
        console.log(`終了日時: ${schedule.endDate}`);
        console.log(`メモ: ${schedule.memo}`);

        // 終了日時が開始日時より前の場合はアラートを表示
        if (schedule.startDate >= schedule.endDate) {
            alert('終了日時は開始日時より後に設定してください。');
            return;
        }
        
        // スケジュールの追加処理
        // ここに追加処理を記述する
        await addSchedule(schedule);

        // フォームの内容を初期化
        setValue('title', '');
        setValue('calendar', 'home');
        setValue('startDate', new Date());
        setValue('endDate', new Date());
        setValue('memo', '');


    };

    return (
        <TouchableOpacity style={{ flex: 1 }} activeOpacity={1} onPress={() => { setStartDatePickerVisible(false); setEndDatePickerVisible(false); }}>
            <Header title="予定追加ページ" />
            <BackButton route='Calendar/CalendarScreen' />
            <TouchableOpacity style={styles.container} activeOpacity={1} onPress={() => {}}>
                <ScrollView>
                    <Controller
                        control={control}
                        name='title'
                        rules={{ required: 'タイトルは必須項目です。' }}
                        render={({ field: { onChange, value } }) => (
                        <>
                            <TextInput
                                label="タイトル"
                                mode="outlined"
                                style={styles.textInput}
                                activeOutlineColor='#4B8687'
                                value={value}
                                onFocus={() => {setStartDatePickerVisible(false); setEndDatePickerVisible(false);}}
                                onChangeText={onChange}
                                placeholder="予定のタイトルを入力してください"
                                placeholderTextColor='#AAAAAA'
                                keyboardType='default'
                                autoCapitalize='none'
                                error={!!errors.title}
                            />
                            {errors.title && <Text style={styles.errorText}>{errors.title.message}</Text>}
                        </>
                        )}
                    />
                    <SelectCountry
                        style={styles.dropdown}
                        selectedTextStyle={styles.selectedTextStyle}
                        placeholderStyle={styles.placeholderStyle}
                        imageStyle={styles.imageStyle}
                        iconStyle={styles.iconStyle}

                        maxHeight={200}
                        value={calendar}
                        data={calendars}
                        valueField="value"
                        labelField="label"
                        imageField="image"
                        placeholder="Select country"
                        onChange={e => {
                        setCalendar(e.value);
                        }}
                    />
                    <Controller
                        control={control}
                        name='startDate'
                        rules={{ required: '開始日時は必須項目です。' }}
                        render={({ field: { onChange, value } }) => (
                        <>
                            <TextInput
                                label="開始日時"
                                mode="outlined"
                                style={styles.textInput}
                                activeOutlineColor='#4B8687'
                                value={value ? value.toLocaleDateString('ja-JP', timeOptions) : ''}
                                onPress={() => {
                                    setValue('startDate', startDate); // 初期値を設定
                                    setStartDatePickerVisible(true);
                                    setEndDatePickerVisible(false);
                                }}
                                keyboardType='default'
                                autoCapitalize='none'
                                editable={false}
                                error={!!errors.startDate}
                            />
                            {errors.startDate && <Text style={styles.errorText}>{errors.startDate.message}</Text>}
                            {startDatePickerVisible && 
                                <DateTimePicker
                                    value={startDate}
                                    mode="datetime"
                                    display="spinner"
                                    minuteInterval={10}
                                    onChange={(event, selectedDate) => {
                                        const currentDate = selectedDate || startDate;
                                        setStartDate(currentDate);
                                        onChange(currentDate);
                                    }}
                                    locale="ja-JP"
                                    style={styles.dateInput}
                                />
                            }
                        </>
                        )}
                    />
                    <Controller
                        control={control}
                        name='endDate'
                        rules={{ required: '終了日時は必須項目です。' }}
                        render={({ field: { onChange, value } }) => (
                        <>
                            <TextInput
                                label="終了日時"
                                mode="outlined"
                                style={styles.textInput}
                                activeOutlineColor='#4B8687'
                                value={value ? value.toLocaleDateString('ja-JP', timeOptions) : ''}
                                onPress={() => {
                                    setValue('endDate', endDate); // 初期値を設定
                                    setStartDatePickerVisible(false);
                                    setEndDatePickerVisible(true);
                                }}
                                keyboardType='default'
                                autoCapitalize='none'
                                editable={false}
                                error={!!errors.endDate}
                            />
                            {errors.endDate && <Text style={styles.errorText}>{errors.endDate.message}</Text>}
                            {endDatePickerVisible && 
                                <DateTimePicker
                                    value={endDate}
                                    mode="datetime"
                                    display="spinner"
                                    minuteInterval={10}
                                    onChange={(event, selectedDate) => {
                                        const currentDate = selectedDate || endDate;
                                        setEndDate(currentDate);
                                        onChange(currentDate);
                                    }}
                                    locale="ja-JP"
                                    style={styles.dateInput}
                                />
                            }
                        </>
                        )}
                    />
                    <Controller
                        control={control}
                        name='memo'
                        render={({ field: { onChange, value } }) => (
                        <>
                        <TextInput
                            label="メモ"
                            mode="outlined"
                            style={styles.memoInput}
                            activeOutlineColor='#4B8687'
                            value={value}
                            onChangeText={onChange}
                            onFocus={() => {setStartDatePickerVisible(false); setEndDatePickerVisible(false);}}
                            placeholderTextColor='#AAAAAA'
                            keyboardType='default'
                            autoCapitalize='none'
                        />
                        </>
                        )}
                    />
                    <Button
                        mode="contained"
                        onPress={handleSubmit(onSubmit)}
                        style={styles.button}
                    >
                    追加する
                    </Button>
                </ScrollView>
            </TouchableOpacity>
        </TouchableOpacity>
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
    errorText: {
        color: 'red',
        marginHorizontal: 20,
        marginTop: 5,
    },
    dropdown: {
        margin: 16,
        height: 50,
        borderBottomColor: 'gray',
        borderBottomWidth: 0.5,
      },
      imageStyle: {
        width: 24,
        height: 24,
      },
      placeholderStyle: {
        fontSize: 16,
      },
      selectedTextStyle: {
        fontSize: 16,
        marginLeft: 8,
      },
      iconStyle: {
        width: 20,
        height: 20,
      },
      inputSearchStyle: {
        height: 40,
        fontSize: 16,
      },
});

export default AddScheduleScreen;
