"use client";
import { getExampleSubscription } from "@/libs/firestore";
import { ExampleSubscription } from "@/types/ExampleSubscription";
import React, { ChangeEvent, useEffect, useState } from "react";

type Props = object; // Propsの型をここに定義

const formDivStyle = {
  color: "gray",
  width: "300px",
  padding: "10px",
  borderRadius: "10px",
  marginBottom: "15px",
  margin: "auto",
};

const selectDivStyle = {
  width: "80%",
  height: "40px",
  padding: "10px",
  borderRadius: "8px",
  marginBottom: "15px",
};

const MyComponent: React.FC<Props> = () => {
  const [exampleSubscriptions, setExampleSubscriptions] = useState<
    ExampleSubscription[]
  >([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [name, setName] = useState("");
  const [paymentPeriod, setPaymentPeriod] = useState("");
  const [fee, setFee] = useState("");
  const [freq, setFreq] = useState("");

  const handleChangeSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    console.log(e.target.value);
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
        console.log(data);
        setExampleSubscriptions(
          data
            .filter((elem) => elem.name)
            .sort((a, b) => a.name.localeCompare(b.name))
        );
      },
      (err) => console.error(err)
    );
  }, []);

  return (
    <div style={{ paddingTop: "30px" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* セレクタ */}
        <h3 style={{ marginLeft: "20px" }}>どのサブスクを登録しますか？</h3>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "300px",
            padding: "10px",
            borderRadius: "10px",
            marginBottom: "15px",
          }}
        >
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

          <div style={formDivStyle}>
            サブスク名
            <input
              type="text"
              style={{
                display: "block",
                width: "80%",
                height: "35px",
                borderRadius: "5px",
                border: "2px solid brack",
                padding: "5px",
              }}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div style={formDivStyle}>
            支払い頻度
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

          <div style={formDivStyle}>
            金額
            <input
              type="number"
              style={{
                display: "block",
                width: "80%",
                height: "35px",
                borderRadius: "5px",
                border: "2px solid brack",
                padding: "5px",
              }}
              value={fee}
              onChange={(e) => setFee(e.target.value)}
            />
          </div>

          <div style={formDivStyle}>
            利用頻度
            <br />
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
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <button
          style={{
            backgroundColor: "white",
            border: "2px solid #3C6E71",
            borderRadius: "7px ",
            width: "20%",
          }}
        >
          登録
        </button>
      </div>
    </div>
  );
};

export default MyComponent;
