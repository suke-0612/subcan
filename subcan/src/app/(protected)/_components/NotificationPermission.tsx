"use client";

import { useState, useEffect } from "react";
import useNotificationPermissionStatus from "@/utils/hooks/useNotificationPermissionStatus";

const NotificationPermission = () => {
  const permission = useNotificationPermissionStatus();
  const [showPrompt, setShowPrompt] = useState(true);

  const requestPermission = async () => {
    try {
      const result = await Notification.requestPermission();
      if (result === "granted") {
        setShowPrompt(false);
      } else {
        console.log("Notification permission denied");
      }
    } catch (error) {
      console.error("Error requesting notification permission:", error);
    }
  };

  useEffect(() => {
    // 未許可状態の場合のみプロンプトを表示
    if (permission === "default") {
      setShowPrompt(true);
    } else {
      setShowPrompt(false);
    }
  }, [permission]);

  if (!showPrompt) return null;

  return (
    <div
      style={{
        padding: "10px",
        marginTop: "20px",
        borderRadius: "10px",
        textAlign: "center",
        marginBottom: "20px",
        width: "90%",
        border: "5px solid #ccc",
      }}
    >
      <p>サブスクの引き落としのリマインドを受け取るには</p>
      <p>通知の許可をお願いします</p>
      <button
        onClick={() => setShowPrompt(false)}
        style={{
          backgroundColor: "gray",
          color: "#fff",
          width: "100px",
          border: "none",
          padding: "10px 20px",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        後で
      </button>
      <button
        onClick={requestPermission}
        style={{
          backgroundColor: "green",
          color: "#fff",
          border: "none",
          padding: "10px 20px",
          width: "100px",
          borderRadius: "5px",
          cursor: "pointer",
          marginLeft: "10px",
        }}
      >
        許可する
      </button>
    </div>
  );
};

export default NotificationPermission;
