"use client";
import { getExampleSubscription } from "@/libs/firestore";
import { ExampleSubscription } from "@/types/ExampleSubscription";
import React, { ChangeEvent, useEffect, useState } from "react";
import GoogleCalendarButton from "@/components/GoogleComponentButton";

type Props = object; // Propsの型をここに定義

const RegisterPage: React.FC<Props> = () => {
  const [exampleSubscriptions, setExampleSubscriptions] = useState<
    ExampleSubscription[]
  >([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [name, setName] = useState("");
  const [paymentPeriod, setPaymentPeriod] = useState("");
  const [fee, setFee] = useState("");
  const [freq, setFreq] = useState("");
  const handleChangeSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = Number(e.target.value);
    setSelectedIndex(value);

    if (selectedIndex === value) return;

    if (value === -1) {
      setName("");
      setPaymentPeriod("");
      setFee("");
      return;
    }

    setName(exampleSubscriptions[value].name);
    // 一旦適当に分けます
    setPaymentPeriod(exampleSubscriptions[value].payment_period);
    setFee(exampleSubscriptions[value].fee.toString());
  };

  useEffect(() => {
    getExampleSubscription().then(
      (data) => {
        setExampleSubscriptions(
          data
            .filter((elem) => elem.name)
            .sort((a, b) => a.name.localeCompare(b.name))
        );
      },
      (err) => console.error(err)
    );
  }, []);

  // Google Calendar Buttonのためのダミーデータ
  const eventTitle = "打ち合わせ";
  const description = "クライアントとの定例ミーティング";
  const location = "Zoom";
  const start = new Date("2025-05-10T15:00:00+09:00");
  const end = new Date("2025-05-10T16:00:00+09:00");

  const selectDivStyle: React.CSSProperties = {
    width: "100%",
    boxSizing: "border-box",
    padding: "8px 10px",
    borderRadius: "6px",
    border: "1.5px solid #ccc",
    fontSize: "16px",
    marginTop: "8px",
  };

  const labelStyle: React.CSSProperties = {
    fontSize: "15px",
    fontWeight: "bold",
    marginBottom: "4px",
  };

  const sectionStyle: React.CSSProperties = {
    marginBottom: "20px",
  };

  return (
    <div>
      <div
        style={{
          margin: "0 auto",
          padding: "24px",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
          サブスク登録
        </h2>

        {/* セレクタ */}
        <div
          style={{
            marginBottom: "20px",
          }}
        >
          <label
            style={{
              fontSize: "15px",
              fontWeight: "bold",
              marginBottom: "4px",
            }}
          >
            どのサブスクを登録しますか？
          </label>
          <select
            style={selectDivStyle}
            value={selectedIndex}
            onChange={handleChangeSelect}
          >
            <option value={-1}>その他</option>
            {exampleSubscriptions.map((elem, idx) => (
              <option value={idx} key={idx}>
                {elem.name}
              </option>
            ))}
          </select>
        </div>

        {/* サブスク名 */}
        <div style={sectionStyle}>
          <label style={labelStyle}>サブスク名</label>
          <input
            type="text"
            style={selectDivStyle}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* 支払い頻度 */}
        <div style={sectionStyle}>
          <label style={labelStyle}>支払い頻度</label>
          <select
            style={selectDivStyle}
            value={paymentPeriod}
            onChange={(e) => setPaymentPeriod(e.target.value)}
          >
            <option value="1">１か月</option>
            <option value="2">３か月</option>
            <option value="3">６か月</option>
            <option value="4">１２か月</option>
          </select>
        </div>

        {/* 金額 */}
        <div style={sectionStyle}>
          <label style={labelStyle}>金額 (円)</label>
          <input
            type="number"
            style={selectDivStyle}
            value={fee}
            onChange={(e) => setFee(e.target.value)}
          />
        </div>

        {/* 利用頻度 */}
        <div style={sectionStyle}>
          <label style={labelStyle}>利用頻度</label>
          <select
            style={selectDivStyle}
            value={freq}
            onChange={(e) => setFreq(e.target.value)}
          >
            <option value="">選択してください</option>
            <option value="1">毎日</option>
            <option value="2">週に数回</option>
            <option value="3">一か月に数回</option>
            <option value="4">一年に数回</option>
          </select>
        </div>

        {/* Google Calendar Button */}
        <div style={{ textAlign: "right", marginBottom: "16px" }}>
          <GoogleCalendarButton
            title={eventTitle}
            description={description}
            location={location}
            startTime={start}
            endTime={end}
          />
        </div>

        {/* 登録ボタン */}
        <div style={{ textAlign: "center" }}>
          <button
            style={{
              backgroundColor: "#3C6E71",
              color: "white",
              border: "none",
              borderRadius: "8px",
              width: "100%",
              height: "44px",
              fontSize: "18px",
              fontWeight: "bold",
              cursor: "pointer",
              transition: "background 0.3s",
            }}
          >
            登録
          </button>
        </div>
      </div>
    </div>
  );
};
export default RegisterPage;
