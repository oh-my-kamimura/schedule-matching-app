import { FirebaseError } from "firebase/app";
import { useState } from "react";
import { useRecoilState } from 'recoil'
import { getDoc, doc } from "firebase/firestore";

import { userDataAtom } from "../Recoil/Atom/userDataAtom";
import { logInAccountInDatabase } from "../Services/accountService";
import { db } from "../config";
import { useFetchAccountInfo } from "./useFetchAccountInfo";

export const useLogInAccount = () => {

	const [userData, setUserData] = useRecoilState(userDataAtom);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');

	const { fetchAccountInfo } = useFetchAccountInfo();

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
		fetchAccountInfo(result);
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