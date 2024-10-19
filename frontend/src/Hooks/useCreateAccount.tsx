import { FirebaseError } from "firebase/app";
import { useState } from "react";
import { RecoilRoot, atom, useRecoilState, useRecoilValue } from 'recoil'

import { userDataAtom } from "../Recoil/Atom/userDataAtom";
import { createAccountInDatabase } from "../Services/accountService";

export const useCreateAccount = () => {

	const [userData, setUserData] = useRecoilState(userDataAtom);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');

	const createAccount = async (): Promise<void | FirebaseError> => {
		setLoading(true);
		console.log("createUser -> userData: ", userData);
		const result = await createAccountInDatabase(userData);
		if (result instanceof FirebaseError) {
			setError('Failed to create account');
			return result;
		}
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