import React from "react";
import Link from "next/link";

const SubscriptionDetail = () => {
  const basicInfo = [
    { label: "金額", value: "内容----------" },
    { label: "次の引き落とし日", value: "内容----------" },
    { label: "最後の支払い日", value: "内容----------" },
    { label: "利用頻度", value: "内容----------" },
    { label: "項目", value: "内容----------" },
  ];
  const firstInfo = [
    { label: "項目", value: "内容----------" },
    { label: "項目", value: "内容----------" },
    { label: "項目", value: "内容----------" },
  ];
  return (
    <div style={{ padding: "16px", fontFamily: "sans-serif" }}>
      {/* サブスクヘッダー */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          backgroundColor: "#bff4a6",
          padding: "16px",
          borderRadius: "12px",
          marginBottom: "16px",
        }}
      >
        <div
          style={{
            width: "90px",
            height: "90px",
            backgroundColor: "#e06c6c",
            borderRadius: "12px",
            marginRight: "16px",
            border: "4px solid #5b9f8a",
          }}
        />
        <div
          style={{
            fontSize: "24px",
            color: "white",
            backgroundColor: "#3b5b63",
            padding: "8px 16px",
            borderRadius: "8px",
          }}
        >
          サブスク名
        </div>
      </div>

      {/* 解約ボタン */}
      <Link href="">
        <button
          style={{
            width: "100%",
            padding: "10px",
            margin: "12px 0",
            border: "2px solid #333",
            borderRadius: "10px",
            background: "white",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          解約ページへ
        </button>
      </Link>

      {/* 基本情報 */}
      <div
        style={{
          marginTop: "16px",
          background: "#fff",
          border: "1px solid #ccc",
          borderRadius: "8px",
          padding: "12px",
        }}
      >
        <h2 style={{ fontSize: "18px", marginBottom: "8px" }}>基本情報</h2>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <tbody>
            {basicInfo.map((item) => (
              <tr key={item.label}>
                <th style={thStyle}>{item.label}</th>
                <td style={tdStyle}>{item.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 最初に登録した情報 */}
      <div
        style={{
          marginTop: "16px",
          background: "#fff",
          border: "1px solid #ccc",
          borderRadius: "8px",
          padding: "12px",
        }}
      >
        <h2 style={{ fontSize: "18px", marginBottom: "8px" }}>
          最初に登録した情報
        </h2>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <tbody>
            {firstInfo.map((item) => (
              <tr key={item.label}>
                <th style={thStyle}>{item.label}</th>
                <td style={tdStyle}>{item.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 情報の修正ボタン */}
      <div
        style={{ marginTop: "24px", display: "flex", justifyContent: "center" }}
      >
        <button
          style={{
            padding: "10px 24px",
            border: "2px solid #3b5b63",
            borderRadius: "10px",
            background: "white",
            color: "#3b5b63",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          情報の修正
        </button>
      </div>
    </div>
  );
};

const thStyle = {
  padding: "8px",
  textAlign: "left" as const,
  borderBottom: "1px solid #eee",
  fontWeight: "normal",
};

const tdStyle = {
  padding: "8px",
  borderBottom: "1px solid #eee",
};

export default SubscriptionDetail;
