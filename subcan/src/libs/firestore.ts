import { subscribe } from "diagnostics_channel";
import { db } from "./firebase";
import { collection, addDoc, getDocs, setDoc, doc } from "firebase/firestore";
import { Subscription } from "@/types/Subscriptions";
import { CheckSubscription } from "@/types/Subscriptions";

// FireStoreを操作する関数はここに書く

// データの追加
export const addUser = async (name: string, email: string) => {
  const docRef = await addDoc(collection(db, "users"), {
    name,
    email,
    createdAt: new Date(),
  });
  return docRef.id;
};

export const addExampleSubscription = async () => {
  const docRef = await addDoc(collection(db, "example_subscription"), {
    name: "Amazonprime",
    fee: 600,
    period: "30days",
    payment_period: "30days",
    icon: "",
    trial_period: "30days",
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
    createdAt: doc.data().createdAt,
  }));
};

export const getsubscriptions = async (): Promise<CheckSubscription[]> => {
  const snapshot = await getDocs(collection(db, "subscriptions"));
  snapshot.docs.map((doc) => console.log(doc.data()));
  return snapshot.docs.map(
    (doc) =>
      ({
        id: doc.id,
        name: doc.data().name,
        fee: doc.data().fee,
        icon: doc.data().icon,
      } as CheckSubscription)
  );
};

export const updateSubscription = async (id: string, value: number) => {
  await setDoc(doc(db, "example_subscription", id), {
    frequency: value,
  });
};
