import { useEffect, useState } from "react";
import useFCMToken from "@/utils/hooks/useFCMToken";
import { messaging } from "@/libs/firebase";
import { MessagePayload, onMessage } from "firebase/messaging";

const useFCM = () => {
  const fcmToken = useFCMToken();
  const [messages, setMessages] = useState<MessagePayload[]>([]);

  useEffect(() => {
    if ("serviceWorker" in navigator && fcmToken) {
      if (messaging === null) return;
      const unsubscribe = onMessage(messaging, (payload) => {
        setMessages((messages) => [...messages, payload]);
      });

      return () => unsubscribe();
    }
  }, [fcmToken]);

  return { fcmToken, messages };
};

export default useFCM;
