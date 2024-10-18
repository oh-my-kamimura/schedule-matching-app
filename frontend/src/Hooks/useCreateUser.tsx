import { FirebaseError } from "firebase/app";
import { RecoilRoot, atom, useRecoilState } from 'recoil'

import { userDataAtom } from "../Recoil/Atom/userDataAtom";
import { createUserInDatabase } from "../Services/accountService";

export const useCreateUser = async () => {

	const [userData] = useRecoilState(userDataAtom);

	const createUser = async (): Promise<void | FirebaseError> => {
		console.log("createUser -> userData: ", userData);
		const result = await createUserInDatabase(userData);
		if (result instanceof FirebaseError) {
			return result;
		}
	};
}