import { Platform, ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Header from '../../Elements/Header';
import { TextInput, Button } from 'react-native-paper';
import React, { memo, useEffect, useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useForm, Controller, set } from 'react-hook-form';
import { addSchedule } from '../../Services/scheduleService';
import Schedule from '../../Types/Schedule';
import { router } from 'expo-router';
import BackButton from '../../Components/BackButton';
import { SelectCountry } from 'react-native-element-dropdown';
import ToggleSwitch from 'toggle-switch-react-native'
import { dateFormat } from '../../Hooks/useCalendarEvents';


function AddScheduleScreen() {
    const [calendar, setCalendar] = useState('outdoor');
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [isAllDay, setIsAllDay] = useState<boolean>(false);
    const [startDatePickerVisible, setStartDatePickerVisible] = useState<boolean>(false);
    const [endDatePickerVisible, setEndDatePickerVisible] = useState<boolean>(false);
    const [formattedStartDate, setFormattedStartDate] = useState<string>('開始日時');
    const [formattedEndDate, setFormattedEndDate] = useState<string>('終了日時');
    const [allowConflict, setAllowConflict] = useState<boolean>(false);
    const [memo, setMemo] = useState<string>('');

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
            value: 'outdoor',
            label: '外出',
            image: require('../../../assets/images/ff9900.png'),
        },
        {
            value: 'home',
            label: '自宅',
            image: require('../../../assets/images/8FBC8B.png'),
        },
        {
            value: 'work',
            label: '仕事',
            image: require('../../../assets/images/FFE944.png'),
        },
    ];
    useEffect(() => {
        setFormattedStartDate(formatTime(startDate));
    }, [startDate]);

    useEffect(() => {
        setFormattedEndDate(formatTime(endDate));
    }, [endDate]);

    const { control, handleSubmit, formState: { errors }, setValue } = useForm<Schedule>({
        mode: 'onChange',
    });

    const onSubmit = async (schedule: Schedule) => {
        schedule.calendar = calendar;
        schedule.startDate = startDate;
        schedule.endDate = endDate;
        schedule.isAllDay = isAllDay;
        schedule.allowConflict = allowConflict;
        schedule.memo = memo;

        startDate.setSeconds(0);
        endDate.setSeconds(0);

        if (schedule.isAllDay) {
            schedule.startDate.setHours(0, 0, 0, 0);
            schedule.endDate.setHours(23, 59, 59, 999);
        }

        // スケジュールの詳細をログに表示
        console.log(`タイトル: ${schedule.title}`);
        console.log(`カレンダー: ${schedule.calendar}`);
        console.log(`終日: ${schedule.isAllDay ? 'はい' : 'いいえ'}`);
        console.log(`開始日時: ${schedule.startDate}`);
        console.log(`終了日時: ${schedule.endDate}`);
        console.log(`他の予定との被りを許可: ${schedule.allowConflict ? 'はい' : 'いいえ'}`);
        console.log(`メモ: ${schedule.memo}`);

        // 終了日時が開始日時より前の場合はアラートを表示
        if (schedule.startDate > schedule.endDate) {
            alert('終了日時は開始日時より後に設定してください。');
            return;
        }

        // スケジュールの追加処理
        await addSchedule(schedule);

        // フォームの内容を初期化
        setValue('title', '');
        setCalendar('outdoor');
        setIsAllDay(false);
        setStartDate(new Date(Math.ceil(new Date().getTime() / (10 * 60 * 1000)) * (10 * 60 * 1000)));
        setEndDate(new Date(Math.ceil(new Date().getTime() / (10 * 60 * 1000)) * (10 * 60 * 1000)));
        setAllowConflict(false);
        setMemo('');

        console.log(`タイトル: ${schedule.title}`);
        console.log(`カレンダー: ${schedule.calendar}`);
        console.log(`終日: ${schedule.isAllDay ? 'はい' : 'いいえ'}`);
        console.log(`開始日時: ${schedule.startDate}`);
        console.log(`終了日時: ${schedule.endDate}`);
        console.log(`他の予定との被りを許可: ${schedule.allowConflict ? 'はい' : 'いいえ'}`);
        console.log(`メモ: ${schedule.memo}`);

        // カレンダー画面に遷移
        router.push('Calendar/CalendarScreen');
    };

    return (
        <TouchableOpacity style={{ flex: 1 }} activeOpacity={1} onPress={() => { setStartDatePickerVisible(false); setEndDatePickerVisible(false); }}>
            <Header title="予定追加ページ" />
            <BackButton route='Calendar/CalendarScreen' />
            <TouchableOpacity style={styles.container} activeOpacity={1} onPress={() => { }}>
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
                                    onFocus={() => { setStartDatePickerVisible(false); setEndDatePickerVisible(false); }}
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
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginHorizontal: 20, borderWidth: 1, backgroundColor: 'white', margin: 16, height: 50, borderRadius: 5, borderColor: 'gray' }}>
                        <Text style={styles.label}>カレンダー</Text>
                        <SelectCountry
                            style={styles.selectCalendar}
                            selectedTextStyle={styles.selectedTextStyle}
                            imageStyle={styles.imageStyle}
                            iconStyle={styles.iconStyle}
                            maxHeight={200}
                            value={calendar}
                            data={calendars}
                            valueField="value"
                            labelField="label"
                            imageField="image"
                            onChange={e => {
                                setCalendar(e.value);
                                console.log(e.value);
                            }}
                        />
                    </View>
                    <View style={{ alignItems: 'flex-end', marginHorizontal: 20, marginVertical: 15 }}>
                        <ToggleSwitch
                            isOn={isAllDay}
                            onColor="green"
                            offColor="red"
                            label="終日"
                            labelStyle={{ color: "black", fontWeight: "500", fontSize: 16, marginHorizontal: 20, right: 245 }}
                            size="medium"
                            onToggle={isOn => {
                                setIsAllDay(isOn);
                            }}
                        />
                    </View>
                    <TextInput
                        label="開始日時"
                        mode="outlined"
                        style={styles.textInput}
                        activeOutlineColor='#4B8687'
                        value={isAllDay ? startDate.toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day:'numeric'}) : startDate.toLocaleDateString('ja-JP', timeOptions)}
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
                            mode={isAllDay ? "date" : "datetime"}
                            display="spinner"
                            minuteInterval={10}
                            onChange={(event, selectedDate) => {
                                const currentDate = selectedDate || startDate;
                                setStartDate(currentDate);
                            }}
                            locale="ja-JP"
                            style={styles.dateInput}
                        />
                    }
                    <TextInput
                        label="終了日時"
                        mode="outlined"
                        style={styles.textInput}
                        activeOutlineColor='#4B8687'
                        value={isAllDay ? endDate.toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day:'numeric'}) : endDate.toLocaleDateString('ja-JP', timeOptions)}
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
                    {endDatePickerVisible &&
                        <DateTimePicker
                            value={endDate}
                            mode={isAllDay ? "date" : "datetime"}
                            display="spinner"
                            minuteInterval={10}
                            onChange={(event, selectedDate) => {
                                const currentDate = selectedDate || endDate;
                                setEndDate(currentDate);
                            }}
                            locale="ja-JP"
                            style={styles.dateInput}
                        />
                    }
                    <View style={{ alignItems: 'flex-end', marginHorizontal: 20, marginTop: 30, marginBottom: 20 }}>
                        <ToggleSwitch
                            isOn={allowConflict}
                            onColor="green"
                            offColor="red"
                            label="他の予定との被りを許可"
                            labelStyle={{ color: "black", fontWeight: "500", fontSize: 16, marginHorizontal: 20, right: 140 }}
                            size="medium"
                            onToggle={isOn => {
                                setAllowConflict(isOn);
                            }}
                        />
                    </View>
                    <TextInput
                        label="メモ"
                        mode="outlined"
                        style={styles.memoInput}
                        activeOutlineColor='#4B8687'
                        value={memo}
                        onChangeText={setMemo}
                        onFocus={() => { setStartDatePickerVisible(false); setEndDatePickerVisible(false); }}
                        placeholderTextColor='#AAAAAA'
                        keyboardType='default'
                        autoCapitalize='none'
                        maxLength={25}
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
    selectCalendar: {
        margin: 16,
        width: 200,
        height: 50,
        borderBottomColor: 'gray',
        borderBottomWidth: 0.5,
    },
    imageStyle: {
        width: 24,
        height: 24,
    },
    selectedTextStyle: {
        fontSize: 16,
        marginLeft: 8,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    label: {
        marginHorizontal: 15,
        fontSize: 16,
    },
});

export default AddScheduleScreen;
