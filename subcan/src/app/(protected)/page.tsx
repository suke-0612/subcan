"use client";

import { logOutWithFirebaseAuth } from "@/libs/firebase-auth";
import { useSession } from "next-auth/react";
import Link from "next/link";

const Page = () => {
  const { data: session } = useSession();

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div style={{ fontSize: 20, fontWeight: 20 }}>
        ログインした人限定のページ
      </div>
      <div>あなたの名前は{session?.user?.name}さんです</div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <button>
          <Link href={`/login`}>/loginページへのリンク</Link>
        </button>
        （※ログインしているセッションが残っているため、このページに戻ってくるよ）
      </div>
      <button onClick={logOutWithFirebaseAuth}>ログアウト</button>
    </div>
  );
};

export default Page;
