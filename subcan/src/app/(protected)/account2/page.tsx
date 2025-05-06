"use client";

import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, updatePassword } from "firebase/auth";
import { logout } from "@/libs/firebase-auth";
// import doLogout from "./test/logout";
// import LogoutPage from "./test/logout";

type Props = {};

const MyComponent: React.FC<Props> = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user && user.email) {
        setEmail(user.email);
      }
    });
  }, []);

  const handlePasswordChange = async () => {
    if (password !== confirm) {
      setMessage("パスワードが一致しません。");
      return;
    }

    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) {
      setMessage("ログインしていません。");
      return;
    }

    try {
      await updatePassword(user, password);
      setMessage("パスワードを変更しました。");
      setPassword("");
      setConfirm("");
    } catch (error: any) {
      setMessage(`エラー: ${error.message}`);
    }
  };

  return (
    <div style={{ margin: "50px" }}>
      <h1 style={{ fontSize: "20px", textAlign: "left" }}>
        メールでログイン中
      </h1>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          borderBottom: "2px solid black",
          paddingBottom: "4px",
          width: "100%",
          maxWidth: "1000px",
          margin: "0 auto",
        }}
      >
        <label
          htmlFor="email"
          style={{
            fontSize: "16px",
            marginBottom: "1px",
            marginRight: "10px",
            whiteSpace: "nowrap",
            color: "gray",
            opacity: 0.7,
          }}
        >
          メール
        </label>
        <h1
          style={{
            flex: 1,
            border: "none",
            outline: "none",
            fontSize: "16px",
            padding: "2px 4px 0",
            backgroundColor: "transparent",
          }}
        >
          {email || "読み込み中..."}
        </h1>
      </div>

      <div
        style={{
          justifyContent: "center",
          alignItems: "center",
          height: "30vh",
        }}
      >
        <h1 style={{ marginTop: "60px", fontSize: "20px", textAlign: "left" }}>
          パスワードを変更
        </h1>

        <div style={{ margin: "10px" }}>
          <p
            style={{
              fontSize: "16px",
              marginRight: "10px",
              whiteSpace: "nowrap",
              color: "gray",
              opacity: 0.7,
            }}
          >
            新しいパスワード
          </p>

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              flex: 1,
              border: "1px solid black",
              borderRadius: "10px",
              maxWidth: "300px",

              fontSize: "30px",
              padding: "4px 0",
              backgroundColor: "transparent",
            }}
          ></input>
        </div>

        <div style={{ margin: "10px" }}>
          <p
            style={{
              fontSize: "16px",
              marginRight: "10px",
              whiteSpace: "nowrap",
              color: "gray",
              opacity: 0.7,
            }}
          >
            新しいパスワード(確認用)
          </p>

          <input
            type="password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            style={{
              flex: 1,
              border: "1px solid black",
              borderRadius: "10px",
              maxWidth: "300px",

              fontSize: "30px",
              padding: "4px 0",
              backgroundColor: "transparent",
            }}
          />
        </div>

        <div style={{ margin: "25px" }}>
          <button
            type="button"
            onClick={handlePasswordChange}
            style={{
              padding: "10px 20px",
              border: "1px solid black",
              borderRadius: "10px",
              backgroundColor: "white",
              color: "black",
              fontSize: "16px",
              fontWeight: "bold",
            }}
          >
            送信
          </button>
        </div>

        <div>
          {message && (
            <p style={{ color: "red", fontSize: "14px" }}>{message}</p>
          )}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "15vh",
        }}
      >
        <button
          style={{
            opacity: 0.5,
            width: "80%",
            maxWidth: "200px",
            padding: "8px 10px",
            border: "1px solid red",
            borderRadius: "10px",
            backgroundColor: "white",
            color: "red",
            fontSize: "20px",
            fontWeight: "bold",
          }}
          onClick={logout}
        >
          ログアウト
        </button>
      </div>
    </div>
  );
};

export default MyComponent;
