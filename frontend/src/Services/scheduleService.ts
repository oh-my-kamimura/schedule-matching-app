
import {
    setDoc, doc, arrayUnion, arrayRemove, 
    updateDoc, collection, query, getDocs, where
  } from "firebase/firestore";
  import { FirebaseError } from "firebase/app";
import { auth, db, storage } from "../config";
import Schedule from '../Types/Schedule';
import { Timestamp } from "firebase/firestore";

export const addSchedule = async (
    schedule: Schedule
): Promise<void | Error> => {
    try {
        if (auth.currentUser === null) return;
        console.log(auth.currentUser.uid);
        await setDoc(doc(collection(db, "users", auth.currentUser.uid, "Calendars")), 
        {
            calendar: schedule.calendar,
            title: schedule.title,
            isAllDay: schedule.isAllDay,
            startTime: schedule.startDate,
            endTime: schedule.endDate,
            allowConflict: schedule.allowConflict,
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

export const fetchEventsInDatabase = async (): Promise<Schedule[] | Error> => {
try {
    let q;
    if (auth.currentUser === null) return [];
    const ref = collection(db, "users", auth.currentUser.uid, "Calendars");
    // TODO: ここでwhere条件を指定するなどして処理スピード向上を図る
    q = query(ref);
    const snapshot = await getDocs(q);
    const events = snapshot.docs.map((doc) => ({
        id: doc.id,
        calendar: doc.data().calendar || '',
        title: doc.data().title || '',
        isAllDay: doc.data().isAllDay || false,
        startDate: (doc.data().startTime as Timestamp).toDate() || new Date,
        endDate: (doc.data().endTime as Timestamp).toDate() || new Date,
        memo: doc.data().memo || '',
        color: doc.data().color || '',
        allowConflict: doc.data().allowConflict || false
    }));
    console.log("--------------------------");
    console.log("eventsが取得しました。", events);
    return events;
  } catch (error) {
    if (error instanceof FirebaseError) {
      const { code, message } = error;
      console.error("FirebaseError: ", error);
      return new FirebaseError(code, message);
    }
    return new Error();
  }
};