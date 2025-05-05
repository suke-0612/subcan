"use client";
import { useState } from "react";
import { loginWithGoogle, loginWithEmail } from "@/libs/firebase-auth";
// import useFCM from "@/utils/hooks/useFCM";
import Image from "next/image";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  // const { messages, fcmToken } = useFCM();
  // console.log(`messages:`, messages);

  const handleEmailLogin = async () => {
    setErrorMsg("");
    setLoading(true);
    try {
      await loginWithEmail(email, password);
    } catch (_error) {
      if (_error instanceof Error) {
        console.error(_error.message);
      }
      setErrorMsg("メールアドレスまたはパスワードが正しくありません");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "400px",
        padding: "32px",
      }}
    >
      {/* ロゴ */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "24px",
        }}
      >
        <Image
          width={48}
          height={48}
          src="/icon.png"
          alt="Logo"
          style={{
            borderRadius: "8px",
            marginRight: "12px",
          }}
        />
        <h1 style={{ fontSize: "24px", fontWeight: "bold", color: "#284b63" }}>
          サブキャン
        </h1>
      </div>

      <p
        style={{
          marginBottom: "16px",
          textAlign: "center",
          fontWeight: "bold",
          fontSize: "18px",
        }}
      >
        今すぐ参加しましょう
      </p>

      {/* Google ログイン */}
      <button
        onClick={loginWithGoogle}
        style={{
          width: "100%",
          padding: "12px",
          marginBottom: "16px",
          borderRadius: "24px",
          border: "1px solid #353535",
          backgroundColor: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "16px",
          cursor: "pointer",
        }}
      >
        <Image
          width={20}
          height={20}
          src="/google.png"
          alt="Google"
          style={{ marginRight: "8px" }}
        />
        Googleでログイン
      </button>

      <p style={{ textAlign: "center", margin: "16px 0" }}>または</p>

      {/* メールアドレス・パスワード */}
      <div>
        <input
          type="email"
          placeholder="メールアドレス"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "8px",
            border: "1px solid #ccc",
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
            padding: "10px",
            marginBottom: "16px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            boxSizing: "border-box",
          }}
        />

        <button
          onClick={handleEmailLogin}
          disabled={loading}
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "24px",
            border: "none",
            backgroundColor: "#3c6e71",
            color: "#fff",
            fontSize: "16px",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          {loading ? "ログイン中..." : "メールアドレスでログイン"}
        </button>

        {errorMsg && (
          <p style={{ color: "red", marginTop: "8px", textAlign: "center" }}>
            {errorMsg}
          </p>
        )}
      </div>

      <hr style={{ margin: "24px 0", borderColor: "#d9d9d9" }} />

      <p
        style={{
          marginBottom: "12px",
          textAlign: "center",
          fontWeight: "bold",
        }}
      >
        初めての方はこちら
      </p>

      <Link href="/auth/register">
        <button
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "24px",
            border: "none",
            backgroundColor: "#284b63",
            color: "#fff",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          アカウントを作成
        </button>
      </Link>
    </div>
  );
}
