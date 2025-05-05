"use client";

import { useEffect } from "react";
import useFCMToken from "@/utils/hooks/useFCMToken";

import { useSession } from "next-auth/react";
import { saveFCMToken } from "@/libs/firestore";

/**
 * ログイン済みユーザーのFCMトークンを管理し、Firestoreに保存するコンポーネント
 */
export default function FCMTokenManager() {
  const { data: session } = useSession(); // あなたの認証フックによる実装
  const user = session?.user;
  const fcmToken = useFCMToken();

  useEffect(() => {
    // ユーザーがログインしていて、FCMトークンが取得できている場合
    if (user?.uid && fcmToken) {
      // Firestoreにトークンを保存
      saveFCMToken(user.uid, fcmToken).catch((error) => {
        console.error("FCMトークンの保存に失敗しました:", error);
      });
    }
  }, [user, fcmToken]);

  // UIは何も表示しない
  return null;
}
