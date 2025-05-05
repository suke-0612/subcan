"use client";
import { useEffect, useState } from "react";
import { getToken } from "firebase/messaging";
import useNotificationPermissionStatus from "@/utils/hooks/useNotificationPermissionStatus";
import { messaging } from "@/libs/firebase";

const useFCMToken = () => {
  const permission = useNotificationPermissionStatus();
  const [fcmToken, setFcmToken] = useState<string | null>(null);

  useEffect(() => {
    const retrieveToken = async () => {
      if (typeof window !== "undefined" && "serviceWorker" in navigator) {
        if (permission === "granted" && messaging !== null) {
          const token = await getToken(messaging, {
            vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
          });

          setFcmToken(token);
        }
      }
    };

    retrieveToken();
  }, [permission]);

  return fcmToken;
};

export default useFCMToken;
