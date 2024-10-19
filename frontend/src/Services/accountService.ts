import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { FirebaseError } from "firebase/app";
import uuid from "react-native-uuid";
import { signInWithEmailAndPassword } from "firebase/auth";

import { auth, db, storage } from "../config";

export const createAccountInDatabase = async (
  userData: any
): Promise<void | Error> => {
  let userCredential;
  try {
    userCredential = await createUserWithEmailAndPassword(
      auth,
      userData.email,
      userData.password
    );
    console.log("-------------------------");
    console.log("Authenticationへの登録完了");
    console.log("uid: ", userCredential.user.uid);

    uploadImageInStorage(userData.imagePath);

    await setDoc(doc(db, "users", userCredential.user.uid), {
      userName: userData.userName,
      email: userData.email,
      imagePath: userData.imagePath,
    });
    console.log("-------------------------");
    console.log("firestoreへのデータ格納完了");
    console.log("id: ", userCredential.user.uid);
  } catch (error) {
    if (error instanceof FirebaseError) {
      if (userCredential) {
        await auth.currentUser?.delete();
        console.log(
          "Firestoreへの格納のみ失敗したため、登録したユーザーを削除しました。"
        );
      }
      const { code, message } = error;
      console.error("FirebaseError: ", error);
      return new FirebaseError(code, message);
    }
    return new Error();
  }
};

export const uploadImageInStorage = async (uri: string) => {
  // TODO: プロフィール画像変更処理時に使用
  const deleteImage = async () => {
    const storageRef = ref(storage, uri);
    await deleteObject(storageRef);
    console.log("古い画像を削除しました。");
  };

  const uploadImage = async (uri: string) => {
    try {
      const response = await fetch(uri);
      const blob = await response.blob();
      const filename = uuid.v4();
      const storageRef = ref(storage, `profile_images/${filename}`);
      await uploadBytes(storageRef, blob);
      const downloadURL = await getDownloadURL(storageRef);
      console.log("Uploaded image URL:", downloadURL);
    } catch (error) {
      console.error("画像のアップロードに失敗しました:", error);
    }
  };

  uploadImage(uri);
};

export const logInAccountInDatabase = async (
  email: string,
  password: string
): Promise<void | Error> => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    console.log("--------------------");
    console.log("Firebase: ログイン処理が完了");
    console.log("uid: ", userCredential.user.uid);
  } catch (error) {
    if (error instanceof FirebaseError){
      const { code, message } = error;
      console.error("FirebaseError: ", error);
      return new FirebaseError(code, message);
    }
    return new Error();
  }
};
