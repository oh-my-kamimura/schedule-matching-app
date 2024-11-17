import { DateData } from 'react-native-calendars';
import { atom } from 'recoil'

export const selectedDayAtom = atom<DateData>({
	key: 'selectedDay',
	default: { 
		dateString: new Date().toISOString().split('T')[0],
		day: new Date().getDate(),
		month: new Date().getMonth() + 1,
		year: new Date().getFullYear()
	} as DateData,
  });