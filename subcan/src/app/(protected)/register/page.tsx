"use client";
import { getExampleSubscription, addSubscriptionInfo } from "@/libs/firestore";
import { ExampleSubscription } from "@/types/ExampleSubscription";
import React, { ChangeEvent, useEffect, useState } from "react";
import GoogleCalendarButton from "@/components/GoogleComponentButton";
import { useSession } from "next-auth/react";
import { Timestamp } from "firebase/firestore";
import Link from "next/link";

type Props = object; // Propsの型をここに定義

const RegisterPage: React.FC<Props> = () => {
  const { data: session } = useSession();
  const user_id = session?.user?.uid;
  const [exampleSubscriptions, setExampleSubscriptions] = useState<
    ExampleSubscription[]
  >([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [name, setName] = useState("");
  const [paymentPeriod, setPaymentPeriod] = useState(0);
  const [fee, setFee] = useState(0);
  const [freq, setFreq] = useState(0);
  const [icon, setIcon] = useState("");
  const [isTrialPeriod, setIsTrialPeriod] = useState(false);
  const [paymentStartsAt, setPaymentStartsAt] = useState("");
  const [lastPaymentDate, setLastPaymentDate] = useState("");
  const [cancelUrl, setCancelUrl] = useState("");

  const handleChangeSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = Number(e.target.value);
    setSelectedIndex(value);

    if (selectedIndex === value) return;

    if (value === -1) {
      setName("");
      setPaymentPeriod(0);
      setFee(0);
      setIcon("");
      setFreq(0);
      setCancelUrl("");
      return;
    }

    setName(exampleSubscriptions[value].name);
    setIcon(exampleSubscriptions[value].icon);
    setPaymentPeriod(exampleSubscriptions[value].payment_period);
    setFee(exampleSubscriptions[value].fee);
  };

  const SubmitSubscription = () => {
    if (!user_id) {
      console.error("ユーザーIDが取得できませんでした");
      return;
    }
    const info = {
      id: "",
      user_id: user_id,
      name: name,
      fee: fee,
      payment_starts_at: Timestamp.fromDate(new Date(paymentStartsAt)), // 支払開始日
      payment_period: paymentPeriod, // 支払期間
      last_payment_date: Timestamp.fromDate(new Date(lastPaymentDate)), // 最後の支払日
      frequency: freq, // ユーザーの利用頻度
      icon: icon,
      is_trial_period: isTrialPeriod, // 無料期間
      cancel_url: cancelUrl, // 解約先URL
      created_at: Timestamp.fromDate(new Date()),
      updated_at: Timestamp.fromDate(new Date()),
    };
    addSubscriptionInfo(info);
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
  const eventTitle = name ? `${name} の引き落とし日` : "サブスク引き落とし日";
  const description = `この日は ${name || "サブスク"} の支払い日です。`;
  const location = cancelUrl || "オンライン";
  // Google Calendar ボタン用: 最後の引き落とし日を使ったイベント設定
  const start = lastPaymentDate
    ? new Date(`${lastPaymentDate}T09:00:00`) // 9:00に開始（任意）
    : new Date();
  const end = lastPaymentDate
    ? new Date(`${lastPaymentDate}T09:30:00`) // 30分後に終了（任意）
    : new Date();

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
        {/* アイコン */}
        {selectedIndex !== -1 && (
          <div
            style={{
              padding: "10px",
              width: "40%",
              textAlign: "center",
              flex: 4,
            }}
          >
            <img
              src={icon}
              alt={`${name} icon`}
              style={{
                maxWidth: "80%",
                maxHeight: "80%",
                backgroundColor: "white",
                borderRadius: "13px",
              }}
            />
          </div>
        )}
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
            onChange={(e) => setPaymentPeriod(Number(e.target.value))}
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
            onChange={(e) => setFee(Number(e.target.value))}
          />
        </div>
        {/* 利用頻度 */}
        <div style={sectionStyle}>
          <label style={labelStyle}>利用頻度</label>
          <select
            style={selectDivStyle}
            value={freq}
            onChange={(e) => setFreq(Number(e.target.value))}
          >
            <option value="">選択してください</option>
            <option value="1">毎日</option>
            <option value="2">週に数回</option>
            <option value="3">一か月に数回</option>
            <option value="4">一年に数回</option>
          </select>
        </div>
        {/* 解約URL */}
        <div style={sectionStyle}>
          <label style={labelStyle}>解約URL</label>
          <input
            type="string"
            style={selectDivStyle}
            value={cancelUrl}
            onChange={(e) => setCancelUrl(e.target.value)}
          />
        </div>
        {/* 開始日 */}
        <div style={sectionStyle}>
          <label style={labelStyle}>サブスク利用開始日</label>
          <input
            type="date"
            style={selectDivStyle}
            value={paymentStartsAt}
            onChange={(e) => setPaymentStartsAt(e.target.value)}
          />
        </div>
        {/* 最後の引き落とし日 */}
        <div style={sectionStyle}>
          <label style={labelStyle}>最後の引き落とし日</label>
          <input
            type="date"
            style={selectDivStyle}
            value={lastPaymentDate}
            onChange={(e) => setLastPaymentDate(e.target.value)}
          />
        </div>
        {/* 無料期間　*/}
        <div style={sectionStyle}>
          <label style={labelStyle}>無料期間ですか？</label>
          <select
            style={selectDivStyle}
            value={isTrialPeriod ? "1" : "2"}
            onChange={(e) => setIsTrialPeriod(e.target.value === "1")}
          >
            <option value="">選択してください</option>
            <option value="1">はい</option>
            <option value="2">いいえ</option>
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
          <Link href="/">
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
              onClick={SubmitSubscription}
            >
              登録
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default RegisterPage;
