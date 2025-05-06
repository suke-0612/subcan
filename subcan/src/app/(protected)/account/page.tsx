"use client";
import React, { useEffect, useState } from "react";
import { logout } from "@/libs/firebase-auth";
import { useRouter } from "next/navigation";
import { getAuth, onAuthStateChanged } from "firebase/auth";

type Props = {
  // Propsの型をここに定義
};

const MyComponent: React.FC<Props> = (props) => {
  const router = useRouter();
  const [email, setEmail] = useState("");

  useEffect(() => {
    const auth = getAuth();

    onAuthStateChanged(auth, (user) => {
      if (user) {
        const providers = user.providerData.map((p) => p.providerId);

        if (providers.includes("google.com")) {
          setEmail(user.email || "");
        } else if (providers.includes("password")) {
          router.push("/account2"); // メールログイン
        } else {
          router.push("/"); // その他またはエラー時にトップへ
        }
      } else {
        router.push("/auth/login"); // 未ログイン
      }
    });
  }, [router]);

  return (
    <div style={{ paddingTop: "30px", margin: "30px" }}>
      <h1 style={{ fontSize: "20px", textAlign: "left" }}>
        Googleアカウントでログイン中
      </h1>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          borderBottom: "2px solid black",
          paddingBottom: "2px",
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
