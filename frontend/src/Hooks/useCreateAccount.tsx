import { FirebaseError } from "firebase/app";
import { useState } from "react";
import { useRecoilState } from 'recoil'

import { userDataAtom } from "../Recoil/Atom/userDataAtom";
import { createAccountInDatabase } from "../Services/accountService";
import { useFetchAccountInfo } from "./useFetchAccountInfo";

export const useCreateAccount = () => {

	const [userData, setUserData] = useRecoilState(userDataAtom);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');

	const { fetchAccountInfo } = useFetchAccountInfo();

	const createAccount = async (): Promise<void | Error> => {
		setLoading(true);
		const result = await createAccountInDatabase(userData);
		if (result instanceof FirebaseError) {
			setError('Firebaseの処理でエラーが発生しました');
			return result;
		}else if (result instanceof Error) {
			setError('エラーが発生しました');
			return result;
		}
		fetchAccountInfo(result);
		setLoading(false);
	};

	return {
		userData,
		setUserData,
		createAccount,
		loading,
		error,
	};
}