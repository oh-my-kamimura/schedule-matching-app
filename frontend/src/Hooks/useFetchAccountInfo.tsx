import { useRecoilState } from 'recoil'
import { getDoc, doc } from "firebase/firestore";

import { userDataAtom } from "../Recoil/Atom/userDataAtom";
import { db } from "../config";


export const useFetchAccountInfo = () => {

	const [userData, setUserData] = useRecoilState(userDataAtom);

	const fetchAccountInfo = async (uid: string) => {
		const docRef = doc(db, "users", uid);
		const docSnap = await getDoc(docRef);
		if (docSnap.exists()) {
			const data = docSnap.data();
			setUserData({
				...userData,
				userName: data.userName,
				email: data.email,
				imagePath: data.imagePath,
				imageDownloadURL: data.imageDownloadURL,
				friendsList: data.friendsList
			});
			console.log("--------------------");
			console.log("ユーザーデータを取得できました");
		} else {
			console.log("--------------------");
			console.log("ユーザーデータの取得に失敗しました");
		}
	}

	return {
		userData,
		setUserData,
		fetchAccountInfo
	}

}