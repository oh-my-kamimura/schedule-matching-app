import { createUserWithEmailAndPassword } from "firebase/auth";
import {
  setDoc, doc, arrayUnion, arrayRemove, 
  updateDoc, collection, query, getDocs, where
} from "firebase/firestore";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { FirebaseError } from "firebase/app";
import uuid from "react-native-uuid";
import { signInWithEmailAndPassword } from "firebase/auth";

import { auth, db, storage } from "../config";

export const createAccountInDatabase = async (
  userData: any
): Promise<string | Error> => {
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

    const downloadURL = await uploadImageInStorage(userData.imagePath);

    await setDoc(doc(db, "users", userCredential.user.uid), {
      userName: userData.userName,
      email: userData.email,
      imagePath: userData.imagePath,
      imageDownloadURL: downloadURL,
    });
    console.log("-------------------------");
    console.log("firestoreへのデータ格納完了");
    console.log("id: ", userCredential.user.uid);
  } catch (error) {
    console.error(error);
    if (error instanceof FirebaseError) {
      if (userCredential) {
        await auth.currentUser?.delete();
        console.log("Firestoreへの格納のみ失敗しているため、登録されたユーザーを削除しました。");
      }
      const { code, message } = error;
      return new FirebaseError(code, message);
    }
    return new Error();
  }
  return userCredential.user.uid;
};

export const uploadImageInStorage = async (uri: string): Promise<string> => {
  let downloadURL = "";
  // TODO: プロフィール画像変更処理時に使用
  const deleteImage = async () => {
    const storageRef = ref(storage, uri);
    await deleteObject(storageRef);
    console.log("--------------------");
    console.log("すでに画像が登録されていたため古い画像を削除しました。");
  };

  const uploadImage = async (uri: string) => {
    try {
      const response = await fetch(uri);
      const blob = await response.blob();
      const filename = uuid.v4();
      const storageRef = ref(storage, `profile_images/${filename}`);
      await uploadBytes(storageRef, blob);
      downloadURL = await getDownloadURL(storageRef);
      console.log("--------------------");
      console.log("Uploaded image URL:", downloadURL);
    } catch (error) {
      console.log("--------------------");
      console.log("画像のアップロードに失敗しました:");
    }
  };
  await uploadImage(uri);
  return downloadURL;
};

export const logInAccountInDatabase = async (
  email: string,
  password: string
): Promise<string | Error> => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log("--------------------");
    console.log("Firebase: ログイン処理が完了");
    console.log("uid: ", userCredential.user.uid);
    return userCredential.user.uid;
  } catch (error) {
    if (error instanceof FirebaseError) {
      const { code, message } = error;
      console.error("FirebaseError: ", error);
      return new FirebaseError(code, message);
    }
    return new Error();
  }
};

export const addFriendInDatabase = async (
  uid: string
): Promise<void | Error> => {
  try {
    if (auth.currentUser === null) return;
    console.log(auth.currentUser.uid);
    await updateDoc(doc(db, "users", auth.currentUser.uid), {
      friendsList: arrayUnion(uid),
    });
    console.log("-------------------------");
    console.log("firestoreへのデータ格納完了");
  } catch (error) {
    if (error instanceof FirebaseError) {
      const { code, message } = error;
      console.error("FirebaseError: ", error);
      return new FirebaseError(code, message);
    }
    return new Error();
  }
};

export const removeFriendInDatabase = async (
  uid: string
): Promise<void | Error> => {
  try {
    if (auth.currentUser === null) return;
    console.log(auth.currentUser.uid);
    await updateDoc(doc(db, "users", auth.currentUser.uid), {
      friendsList: arrayRemove(uid),
    });
    console.log("-------------------------");
    console.log("firestoreからデータ削除完了");
  } catch (error) {
    if (error instanceof FirebaseError) {
      const { code, message } = error;
      console.error("FirebaseError: ", error);
      return new FirebaseError(code, message);
    }
    return new Error();
  }
};

export const searchFriendInDatabase = async (
  searchText: string,
  filterList?: any[]
): Promise<any[] | FirebaseError> => {
  try {
    let q;
    const ref = collection(db, "users");
    if (filterList) {
      if (searchText.trim() === "") {
        q = query(ref, where("__name__", "in", filterList));
      } else {
        q = query(
          ref,
          where("userName", ">=", searchText),
          where("userName", "<=", searchText + "\uf8ff"),
          where("__name__", "!=", auth.currentUser?.uid),
          where("__name__", "in", filterList)
        );
      }
    } else {
      if (searchText.trim() === "") {
        return [];
      }
      q = query(
        ref,
        where("userName", ">=", searchText),
        where("userName", "<=", searchText + "\uf8ff"),
        where("__name__", "!=", auth.currentUser?.uid)
      );
    }
    const snapshot = await getDocs(q);
    const users = snapshot.docs.map((doc) => ({
...doc.data(),
      uid: doc.id,
    }));
    return users;
  } catch (error) {
    console.error("Error searching users: ", error);
  }
  return [];
};
