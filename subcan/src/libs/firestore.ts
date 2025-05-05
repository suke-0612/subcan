import { db } from "./firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";

// FireStoreを操作する関数はここに書く

// データの追加
export const addUser = async (name: string, email: string) => {
  const docRef = await addDoc(collection(db, "users"), {
    name,
    email,
    created_at: new Date(),
  });
  return docRef.id;
};

// データの取得
export const getUsers = async () => {
  const snapshot = await getDocs(collection(db, "users"));
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    name: doc.data().name,
    email: doc.data().email,
    created_at: doc.data().createdAt,
  }));
};
