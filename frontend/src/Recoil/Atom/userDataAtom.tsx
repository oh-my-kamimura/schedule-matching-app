import { atom } from 'recoil'

export const userDataAtom = atom({
	key: 'userData',
	default: {
		userName: "",
		email: "",
		password: "",
		imagePath: "",
		// previousImagePath: "",
		// friendList: [],
	},
});