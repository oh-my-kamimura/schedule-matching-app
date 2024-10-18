import { Alert } from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { FirebaseError } from "firebase/app";
import uuid from 'react-native-uuid';

import { auth } from "../config";
import { db } from "../config";
import { storage } from "../config";

export const createUserInDatabase = async (
  userData: any
): Promise<void | FirebaseError> => {
  console.log("createuserInDatabase開始");
  let userCredential;

  try {
    userCredential = await createUserWithEmailAndPassword(
      auth,
      userData.email,
      userData.password
    );
    console.log("Authenticationへの登録完了");
    console.log("uid: ", userCredential.user.uid);

    uploadImageInStorage(userData.imagePath);

    const docRef = await addDoc(collection(db, "users"), {
      userName: userData.userName,
      email: userData.email,
      imagePath: userData.imagePath,
      uid: userCredential.user.uid,
    });
    console.log("firestoreへのデータ格納完了");
    console.log("id: ", docRef.id);
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
  }
};

export const uploadImageInStorage = async (uri: string) => {
  const deleteImage = async () => {
    const storageRef = ref(storage, uri);
    await deleteObject(storageRef);
    console.log("古い画像を削除しました。");
  };

  const uploadImage = async (uri: string) => {
    try {
      console.log("uri", uri);
      const response = await fetch(uri);
      const blob = await response.blob();
      const filename = uuid.v4();
      const storageRef = ref(storage, `profile_images/${filename}`);
      await uploadBytes(storageRef, blob);
      const downloadURL = await getDownloadURL(storageRef);
      console.log("Uploaded image URL:", downloadURL);
      // setSelectedImageFilepath(`profile_images/${filename}`);
    } catch (error) {
      console.error("画像のアップロードに失敗しました:", error);
    }
  };
  uploadImage(uri);
};
