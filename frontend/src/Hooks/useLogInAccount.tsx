import { FirebaseError } from "firebase/app";
import { useState } from "react";
import { useRecoilState } from 'recoil'

import { userDataAtom } from "../Recoil/Atom/userDataAtom";
import { logInAccountInDatabase } from "../Services/accountService";


export const useLogInAccount = () => {

	const [userData, setUserData] = useRecoilState(userDataAtom);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');

	const logInAccount = async (): Promise<void | Error> => {
		setLoading(true);
		const result = await logInAccountInDatabase(userData.email, userData.password);
		if (result instanceof FirebaseError) {
			setError('Firebaseの処理でエラーが発生しました');
			return result;
		}else if (result instanceof Error) {
			setError('エラーが発生しました');
			return result;
		}
		setLoading(false);
	}
	
	return {
		userData,
		setUserData,
		logInAccount,
		loading,
		error,
	};
}