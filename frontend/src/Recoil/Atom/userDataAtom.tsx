import { atom } from 'recoil'

import UserData from '../../Types/UserData';

export const userDataAtom = atom<UserData>({
	key: 'userData',
	default: {
		userName: "",
		email: "",
		password: "",
		imagePath: "",
		imageDownloadURL: "",
		friendsList: [""],
		// previousImagePath: "",
	},
});