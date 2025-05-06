"use client";
import React from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { getSubscription } from "@/libs/firestore";
import { Subscription } from "@/types/Subscriptions";
import { useEffect, useState } from "react";
import { Timestamp } from "firebase-admin/firestore";
import Card from "@/components/Card";
import Loading from "@/components/Loading";

type Props = {
  subsc_id: string;
};

const SubscriptionDetail = ({ subsc_id }: Props) => {
  const [info, setInfo] = useState<Subscription | undefined>();
  const [isLoading, setIsLoading] = useState(true);
  const { data: session } = useSession();

  useEffect(() => {
    // 今日が最後の支払日超えていたら
    const today = new Date();
    if (info?.last_payment_date) {
      const lastPaymentDate = info.last_payment_date.toDate();
      if (today > lastPaymentDate) {
        let newLastPaymentDate = calculateNextPaymentDate(
          info.last_payment_date,
          info.payment_period
        );
        let newPaymentDate = calculateNextPaymentDate(
          info.last_payment_date,
          info.payment_period
        );
      }
    }
  }, []);
  useEffect(() => {
    if (session?.user?.uid && subsc_id) {
      getSubscription(session.user.uid, subsc_id).then(
        (data) => {
          setInfo(data);
          setIsLoading(false);
        },
        (err) => {
          console.error(err);
          setIsLoading(false);
        }
      );
    }
  }, [session?.user?.uid, subsc_id]);

  if (isLoading) return <Loading />;
  if (!info) return <div style={{ padding: 20 }}>情報が見つかりません。</div>;

  const stringFrequency = (frequency: number) => {
    const options = [
      "毎日",
      "週に数回",
      "月に数回",
      "年に数回",
      "使用していない",
    ];
    return options[frequency] ?? "不明";
  };

  const calculateNextPaymentDate = (
    lastPaymentAt: Timestamp,
    paymentPeriod: number
  ): string => {
    const startDate = lastPaymentAt.toDate();
    const nextPaymentDate = new Date(startDate);

    // 1か月=30日
    const daysMap: { [key: number]: number } = {
      1: 30,
      2: 90,
      3: 180,
      4: 365,
    };

    const periodDays = daysMap[paymentPeriod] ?? 30;
    nextPaymentDate.setDate(startDate.getDate() + periodDays);

    return nextPaymentDate.toLocaleDateString();
  };

  const basicInfo = [
    { label: "金額", value: `¥${info.fee ?? "未登録"}` },
    {
      label: "次の引き落とし日",
      value: info.last_payment_date
        ? calculateNextPaymentDate(info.last_payment_date, info.payment_period)
        : "未登録",
    },
    {
      label: "最後の支払い日",
      value: info.last_payment_date
        ? info.last_payment_date.toDate().toLocaleDateString()
        : "未登録",
    },
    { label: "利用頻度", value: stringFrequency(info.frequency) },
    {
      label: "無料期間",
      value: info.is_trial_period ? "無料期間中" : "無料期間中ではない",
    },
  ];

  return (
    <div style={{ padding: "24px" }}>
      {/* 戻る矢印 */}
      <div
        style={{
          display: "flex",
          justifyContent: "start",
          marginBottom: "24px",
        }}
      >
        <Link
          href="/"
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
      <div style={{ pointerEvents: "none" }}>
        <Card {...info} />
      </div>

      {/* 解約ボタン */}
      <Link href={info.cancel_url ?? "#"}>
        <button
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "20px",
            border: "none",
            borderRadius: "10px",
            backgroundColor: " #FF6B6B",
            color: "white",
            fontWeight: "bold",
            transition: "0.2s ease",
          }}
        >
          解約ページへ
        </button>
      </Link>

      {/* 情報表示 */}
      <InfoTable title="基本情報" items={basicInfo} />

      {/* 情報の修正 */}
      <div style={{ marginTop: "28px", textAlign: "center" }}>
        <Link href={`/edit?id=${subsc_id}`}>
          <button
            style={{
              padding: "10px 24px",
              border: "2px solid #3D5A80",
              borderRadius: "10px",
              backgroundColor: "#3D5A80",
              color: "white",
              fontWeight: "bold",
              cursor: "pointer",
              transition: "0.2s",
            }}
          >
            情報の修正
          </button>
        </Link>
      </div>
    </div>
  );
};

const InfoTable = ({
  title,
  items,
}: {
  title: string;
  items: { label: string; value: string }[];
}) => (
  <div
    style={{
      marginTop: "16px",
      background: "#fff",
      border: "1px solid #ddd",
      borderRadius: "12px",
      padding: "16px",
      boxShadow: "0 2px 6px rgba(0, 0, 0, 0.05)",
    }}
  >
    <h2 style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "12px" }}>
      {title}
    </h2>
    <table style={{ width: "100%", borderCollapse: "collapse" }}>
      <tbody>
        {items.map((item) => (
          <tr key={item.label}>
            <th style={thStyle}>{item.label}</th>
            <td style={tdStyle}>{item.value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const thStyle = {
  padding: "10px",
  textAlign: "left" as const,
  fontWeight: "normal",
  color: "#333",
  borderBottom: "1px solid #eee",
};

const tdStyle = {
  padding: "10px",
  color: "#555",
  borderBottom: "1px solid #eee",
};

export default SubscriptionDetail;
