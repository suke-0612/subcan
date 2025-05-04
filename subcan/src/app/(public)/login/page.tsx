"use client";

import { logInWithFirebaseAuth } from "@/libs/firebase-auth";
import Link from "next/link";

const Page = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div style={{ fontSize: 20, fontWeight: 20 }}>ログインページです</div>
      <Link href={`/`}>
        <button>
          /ページへのリンク（※ログインしてないため、このページに戻ってくるよ）
        </button>
      </Link>
      <button
        onClick={logInWithFirebaseAuth}
        style={{ height: "48px", padding: "8px" }}
      >
        Googleでログインする
      </button>
    </div>
  );
};

export default Page;
