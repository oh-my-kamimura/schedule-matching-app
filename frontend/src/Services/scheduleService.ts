
import {
    setDoc, doc, arrayUnion, arrayRemove, 
    updateDoc, collection, query, getDocs, where
  } from "firebase/firestore";
  import { FirebaseError } from "firebase/app";
import { auth, db, storage } from "../config";
import Schedule from '../Types/Schedule';

// export const addFriendInDatabase = async (
//     uid: string
//   ): Promise<void | Error> => {
//     try {
//       if (auth.currentUser === null) return;
//       console.log(auth.currentUser.uid);
//       await updateDoc(doc(db, "users", auth.currentUser.uid), {
//         friendsList: arrayUnion(uid),
//       });
//       console.log("-------------------------");
//       console.log("firestoreへのデータ格納完了");
//     } catch (error) {
//       if (error instanceof FirebaseError) {
//         const { code, message } = error;
//         console.error("FirebaseError: ", error);
//         return new FirebaseError(code, message);
//       }
//       return new Error();
//     }
//   };

export const addSchedule = async (
    schedule: Schedule
): Promise<void | Error> => {
    try {
        if (auth.currentUser === null) return;
        console.log(auth.currentUser.uid);
        await setDoc(doc(collection(db, "users", auth.currentUser.uid, "Calendars")), 
        {
            title: schedule.title,
            startTime: schedule.startDate,
            endTime: schedule.endDate,
            memo: schedule.memo,
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