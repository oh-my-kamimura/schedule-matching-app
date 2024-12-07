import { ScrollView, StyleSheet, Text, View, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import Header from '../../Elements/Header';
import { TextInput, Button } from 'react-native-paper';
import React, { useCallback, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useForm, Controller } from 'react-hook-form';
import { addSchedule } from '../../Services/scheduleService';
import Schedule from '../../Types/Schedule';
import { router, useFocusEffect } from 'expo-router';
import BackButton from '../../Components/BackButton';
import { SelectCountry } from 'react-native-element-dropdown';
import ToggleSwitch from 'toggle-switch-react-native'
import { selectedDayAtom } from '../../Recoil/Atom/selectedDayAtom';


function AddScheduleScreen() {
    const [selected, setSelected] = useRecoilState(selectedDayAtom);
    const [calendar, setCalendar] = useState('outdoor');
    const [startDate, setStartDate] = useState(selected ? new Date(selected.dateString) : new Date());
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
    useFocusEffect(
        useCallback(() => {
            // 状態を初期化する
            setValue('title', '');
            setCalendar('outdoor');
            setStartDate(selected ? new Date(selected.dateString) : new Date());
            setEndDate(new Date());
            setIsAllDay(false);
            setStartDatePickerVisible(false);
            setEndDatePickerVisible(false);
            setFormattedStartDate('開始日時');
            setFormattedEndDate('終了日時');
            setAllowConflict(false);
            setMemo('');
        }, [selected])
    );
    useEffect(() => {
        if (endDate < startDate) {
            setEndDate(startDate);
        }
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

        // 終了日時が開始日時より前の場合はアラートを表示
        if (schedule.startDate > schedule.endDate) {
            alert('終了日時は開始日時より後に設定してください。');
            return;
        }

        // スケジュールの追加処理
        await addSchedule(schedule);

        // カレンダー画面に遷移
        router.push('Calendar/CalendarScreen');
    };

    return (
        <TouchableOpacity style={{ flex: 1 }} activeOpacity={1} onPress={() => { setStartDatePickerVisible(false); setEndDatePickerVisible(false); }}>
            <Header title="予定追加ページ" />
            <BackButton route='Calendar/CalendarScreen' isAlert={true} />
            <KeyboardAvoidingView style={styles.container} behavior="padding">
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
                            }}
                        />
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginHorizontal: 20, marginVertical: 15 }}>
                        <Text style={styles.label}>終日</Text>
                        <ToggleSwitch
                            isOn={isAllDay}
                            onColor="green"
                            offColor="red"
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
                        value={isAllDay ? startDate.toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric' }) : startDate.toLocaleDateString('ja-JP', timeOptions)}
                        onPress={() => {
                            setValue('startDate', startDate); // 初期値を設定
                            setStartDatePickerVisible(startDatePickerVisible => !startDatePickerVisible);
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
                        value={isAllDay ? endDate.toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric' }) : endDate.toLocaleDateString('ja-JP', timeOptions)}
                        onPress={() => {
                            setValue('endDate', endDate); // 初期値を設定
                            setStartDatePickerVisible(false);
                            setEndDatePickerVisible(endDatePickerVisible => !endDatePickerVisible);
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
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginHorizontal: 20, marginVertical: 15, marginTop: 30 }}>
                        <Text style={styles.label}>他の予定との被りを許可</Text>
                        <ToggleSwitch
                            isOn={allowConflict}
                            onColor="green"
                            offColor="red"
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
            </KeyboardAvoidingView>
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
        color: "black",
        fontWeight: "500",
    },
});

export default AddScheduleScreen;
