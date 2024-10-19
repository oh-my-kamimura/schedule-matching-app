import { FirebaseError } from "firebase/app";
import { useState } from "react";
import { useRecoilState } from 'recoil'
import { getDoc, doc } from "firebase/firestore";

import { userDataAtom } from "../Recoil/Atom/userDataAtom";
import { logInAccountInDatabase } from "../Services/accountService";
import { db } from "../config";

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
		const docRef = doc(db, "users", result);
		const docSnap = await getDoc(docRef);
		if (docSnap.exists()) {
			const data = docSnap.data();
			setUserData({
				...userData,
				userName: data.userName,
				email: data.email,
				imagePath: data.imagePath,
			});
			console.log("--------------------");
			console.log("ユーザーデータを取得できました");
		} else {
			setError('ユーザーデータの取得に失敗しました');
			console.log("--------------------");
			console.log("ユーザーデータの取得に失敗しました");
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