"use client";
import { useState } from "react";
import { loginWithGoogle, loginWithEmail } from "@/libs/firebase-auth";
import Image from "next/image";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const handleEmailLogin = async () => {
    setErrorMsg("");
    setLoading(true);
    try {
      await loginWithEmail(email, password);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_error) {
      setErrorMsg("メールアドレスまたはパスワードが正しくありません");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div
        style={{
          backgroundColor: "#fff",
          paddingTop: "32px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "0px",
          }}
        >
          <div style={{ marginBottom: "24px" }}>
            <input
              type="email"
              placeholder="メールアドレス"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                marginBottom: "8px",
                borderRadius: "8px",
                border: "1px solid #ccc",
              }}
            />
            <input
              type="password"
              placeholder="パスワード"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                marginBottom: "0px",
                borderRadius: "8px",
                border: "1px solid #ccc",
              }}
            />
          </div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          margin: 10,
        }}
      >
        <button
          style={{
            backgroundColor: "white",
            border: "3px solid #3C6E71",
            borderRadius: "7px ",
            width: 150,
            height: 40,
            fontSize: 22,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          決定
        </button>
      </div>
    </div>
  );
}
