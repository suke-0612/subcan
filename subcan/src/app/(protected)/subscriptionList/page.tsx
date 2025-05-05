"use client";
import { getSubscriptionList } from "@/libs/firestore";
import { Subscription } from "@/types/Subscriptions";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { useEffect } from "react";
import { useState } from "react";
import Card from "@/components/Card";
import Loading from "@/components/Loading";

type Props = object;

// 登録しているサブスク一覧
const SubscriptionList: React.FC<Props> = () => {
  const [sortOption, setSortOption] = useState<string>("");
  const [subscList, setSubscList] = useState<Subscription[] | undefined>();

  // uid取得と更新
  const { data: session } = useSession();
  useEffect(() => {
    if (session?.user?.uid) {
      getSubscriptionList(session.user.uid).then(
        (data) => {
          setSubscList(data);
        },
        (err) => {
          console.error(err);
        }
      );
    }
  }, [session?.user?.uid]);

  const sortedSubscList = (() => {
    if (!subscList) return [];
    if (sortOption === "")
      return subscList.sort(
        (a, b) => a.created_at.toMillis() - b.created_at.toMillis()
      );
    if (sortOption === "freqHi")
      return subscList.sort((a, b) => a.frequency - b.frequency);
    if (sortOption === "freqLow")
      return subscList.sort((a, b) => b.frequency - a.frequency);
    if (sortOption === "costHi") return subscList.sort((a, b) => b.fee - a.fee);
    if (sortOption === "costLow")
      return subscList.sort((a, b) => a.fee - b.fee);
    return subscList;
  })();

  if (!subscList) {
    return <Loading />;
  }

  return (
    <div>
      <div
        className="container"
        style={{ maxWidth: "330px", margin: "0 auto", padding: "0 16px" }}
      >
        {/* 並び替え */}
        <div>
          <label htmlFor="sort" style={{ fontWeight: 500 }}>
            並び替え:&nbsp;
          </label>
          <select
            id="sort"
            onChange={(e) => setSortOption(e.target.value)}
            style={{
              padding: "6px 10px",
              borderRadius: "6px",
              border: "1px solid #ccc",
              fontSize: "14px",
            }}
          >
            <option value="">登録順</option>
            <option value="freqHi">使用頻度(高い順)</option>
            <option value="freqLow">使用頻度(低い順)</option>
            <option value="costHi">金額(高い順)</option>
            <option value="costLow">金額(低い順)</option>
          </select>

          {/* 登録件数 */}
          <div
            style={{
              fontSize: "16px",
              fontWeight: 500,
              textAlign: "right",
              marginTop: "8px",
            }}
          >
            全 {subscList.length} 件
          </div>
        </div>

        {/* 一覧のカード */}
        {sortedSubscList.map((info, idx) => (
          <Card {...info} key={idx} />
        ))}
      </div>

      {/* 登録追加ボタン */}
      <Link
        href="/register"
        style={{
          display: "inline-block",
          width: "70px",
          height: "70px",
          backgroundColor: "#3C6E71",
          color: "white",
          borderRadius: "50%",
          textDecoration: "none",
          fontWeight: "bold",
          textAlign: "center",
          fontSize: 45,
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
          position: "fixed",
          bottom: "36px",
          right: "20px",
        }}
      >
        +
      </Link>
    </div>
  );
};

export default SubscriptionList;
