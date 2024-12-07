import { DateData } from 'react-native-calendars';
import { atom } from 'recoil'
import Schedule from '../../Types/Schedule';

export const calendarEventsAtom = atom<Schedule[]>({
	key: 'calendarEvents',
	default: [],
  });