import { DateData } from 'react-native-calendars';
import { atom } from 'recoil'

export const selectedDayAtom = atom<DateData>({
	key: 'selectedDay',
	default: undefined,
  });