"use client";
import { useState } from "react";
import Link from "next/link";
import { registerWithEmail } from "@/libs/firebase-auth";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    setErrorMsg("");
    setLoading(true);
    try {
      // TODO: Implement the registration logic
      await registerWithEmail(email, password);
    } catch (_error: unknown) {
      if (_error instanceof Error) {
        console.error(_error.message);
      }
      setErrorMsg("登録に失敗しました。入力内容をご確認ください。");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        padding: "32px",
        width: "100%",
        maxWidth: "400px",
        boxSizing: "border-box",
      }}
    >
      {/* 戻る矢印 */}
      <div
        style={{
          display: "flex",
          justifyContent: "start",
          marginBottom: "24px",
        }}
      >
        <Link
          href="/auth/login"
          style={{
            textDecoration: "none",
            color: "inherit",
            cursor: "pointer",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-arrow-left"
          >
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
        </Link>
      </div>

      <div
        style={{
          marginBottom: "24px",
          textAlign: "center",
        }}
      >
        <h2 style={{ fontSize: "24px", marginBottom: "8px" }}>
          アカウント作成
        </h2>
        <p style={{ color: "#555" }}>はじめての方はこちらからご登録ください</p>
      </div>

      <input
        type="email"
        placeholder="メールアドレス"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{
          width: "100%",
          padding: "12px",
          marginBottom: "12px",
          borderRadius: "8px",
          border: "1px solid #ccc",
          fontSize: "16px",
          boxSizing: "border-box",
        }}
      />
      <input
        type="password"
        placeholder="パスワード"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{
          width: "100%",
          padding: "12px",
          marginBottom: "16px",
          borderRadius: "8px",
          border: "1px solid #ccc",
          fontSize: "16px",
          boxSizing: "border-box",
        }}
      />

      {errorMsg && (
        <p style={{ color: "red", marginBottom: "12px" }}>{errorMsg}</p>
      )}

      <button
        onClick={handleRegister}
        disabled={loading}
        style={{
          width: "100%",
          padding: "12px",
          backgroundColor: "#3C6E71",
          color: "#fff",
          border: "none",
          fontSize: "16px",
          cursor: "pointer",
          transition: "background-color 0.3s",
          borderRadius: "24px",
        }}
      >
        {loading ? "登録中..." : "アカウントを作成"}
      </button>
    </div>
  );
}
