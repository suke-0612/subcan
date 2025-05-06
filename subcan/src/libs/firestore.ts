import { db, messaging } from "./firebase";
import { EditSubscription, Subscription } from "@/types/Subscriptions";
import { CheckSubscription } from "@/types/Subscriptions";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  query,
  where,
  getDoc,
  doc,
  setDoc,
  arrayRemove,
} from "firebase/firestore";
import { ExampleSubscription } from "@/types/ExampleSubscription";
import { deleteToken } from "firebase/messaging";
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
    created_at: doc.data().createdAt,
  }));
};

export const getsubscriptions = async (): Promise<CheckSubscription[]> => {
  const snapshot = await getDocs(collection(db, "subscriptions"));
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
  await updateDoc(doc(db, "subscriptions", id), {
    frequency: value,
  });
};

// サブスクデータの編集
export const changeSubscriptionInfo = async (fixInfo: EditSubscription) => {
  const data = Object.fromEntries(
    Object.entries(fixInfo).filter(([, v]) => v !== undefined)
  );

  await updateDoc(doc(db, "subscriptions", fixInfo.id), {
    ...data,
    updated_at: new Date(),
  });
};

// サブスクデータの追加
export const addSubscriptionInfo = async (new_subsc: Subscription) => {
  const docRef = await addDoc(collection(db, "subscriptions"), {
    user_id: new_subsc.user_id, // ユーザーID
    name: new_subsc.name, // サブスク名
    fee: new_subsc.fee, // 料金
    payment_starts_at: new_subsc.payment_starts_at, // 支払開始日
    payment_period: new_subsc.payment_period, // 支払期間
    last_payment_date: new_subsc.last_payment_date, // 最後の支払日
    frequency: new_subsc.frequency, // ユーザーの利用頻度
    icon: new_subsc.icon, // アイコンへのパス
    is_trial_period: new_subsc.is_trial_period, // 無料期間か
    cancel_url: new_subsc.cancel_url, // 解約先URL
    created_at: new_subsc.created_at,
    updated_at: new_subsc.updated_at,
  });
  return docRef.id;
};

export const getSubscriptionList = async (
  uid: string
): Promise<Subscription[]> => {
  const snapshot = await getDocs(
    query(collection(db, "subscriptions"), where("user_id", "==", uid))
  );
  return snapshot.docs.map(
    (doc) => ({ id: doc.id, ...doc.data() } as Subscription)
  );
};

// 1つのサブスクのデータを取得
export const getSubscription = async (
  uid: string,
  id: string
): Promise<Subscription | undefined> => {
  const snapshot = await getDoc(doc(db, "subscriptions", id));
  if (snapshot.exists() && snapshot.data().user_id === uid)
    return { id: snapshot.id, ...snapshot.data() } as Subscription;
  return undefined;
};

export const getSubscriptionsById = async (uid: string) => {
  const snapshot = await getDocs(
    query(collection(db, "subscriptions"), where("user_id", "==", uid))
  );
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    name: doc.data().name,
    fee: doc.data().fee,
    payment_starts_at: doc.data().payment_starts_at,
    payment_period: doc.data().payment_period,
    last_payment_date: doc.data().last_payment_date,
    frequency: doc.data().frequency,
    icon: doc.data().icon,
    is_trial_period: doc.data().is_trial_period,
    cancel_url: doc.data().cancel_url,
  }));
};

// サブスク例の一括取得
export const getExampleSubscription = async (): Promise<
  ExampleSubscription[]
> => {
  const snapshot = await getDocs(collection(db, "example_subscription"));
  return snapshot.docs.map(
    (doc) =>
      ({
        ...doc.data(),
      } as ExampleSubscription)
  );
};

// FCMトークンの保存
export const saveFCMToken = async (uid: string, token: string) => {
  try {
    if (!token) {
      console.warn("FCMトークンが空のため保存をスキップします");
      return false;
    }

    // ユーザードキュメントの参照を取得
    const docRef = doc(db, "users", uid);

    // ドキュメントの存在確認
    const snapshot = await getDoc(docRef);

    if (snapshot.exists()) {
      // ドキュメントが存在する場合、現在のトークンリストを取得
      const userData = snapshot.data();
      const existingTokens = userData.fcmTokens || [];

      // トークンが既に存在しない場合のみ追加
      if (!existingTokens.includes(token)) {
        await updateDoc(docRef, {
          fcmTokens: [...existingTokens, token],
          lastUpdated: new Date(),
        });
        console.log(`FCMトークンを追加しました: ${token}`);
      } else {
        console.log(`FCMトークンは既に存在します: ${token}`);
      }
    } else {
      // ドキュメントが存在しない場合は新規作成
      await setDoc(docRef, {
        fcmTokens: [token],
        createdAt: new Date(),
        lastUpdated: new Date(),
      });
      console.log(`新規ユーザーにFCMトークンを保存しました: ${uid}`);
    }

    return true;
  } catch (error) {
    console.error("FCMトークン保存エラー:", error);
    throw error;
  }
};

export const removeFCMToken = async (uid: string, token: string) => {
  try {
    if (!token) {
      console.warn("FCMトークンが空のため削除をスキップします");
      return false;
    }

    // Firestoreからトークンを削除
    const docRef = doc(db, "users", uid);
    await updateDoc(docRef, {
      fcmTokens: arrayRemove(token),
      lastUpdated: new Date(),
    });

    // Firebase Messagingからトークンを削除（ブラウザ側）
    if (messaging) {
      await deleteToken(messaging);
      console.log("ブラウザからFCMトークンを削除しました");
    }

    console.log(`ユーザー ${uid} のFCMトークン ${token} を削除しました`);
    return true;
  } catch (error) {
    console.error("FCMトークン削除エラー:", error);
    throw error;
  }
};

export const removeAllFCMTokens = async (
  uid: string,
  currentToken?: string
) => {
  try {
    // Firestoreからすべてのトークンを削除
    const docRef = doc(db, "users", uid);
    await updateDoc(docRef, {
      fcmTokens: [],
      lastUpdated: new Date(),
    });

    // 現在のデバイスのトークンがあれば、ブラウザからも削除
    if (currentToken && messaging) {
      await deleteToken(messaging);
      console.log("ブラウザからFCMトークンを削除しました");
    }

    console.log(`ユーザー ${uid} のすべてのFCMトークンを削除しました`);
    return true;
  } catch (error) {
    console.error("FCMトークン削除エラー:", error);
    throw error;
  }
};
