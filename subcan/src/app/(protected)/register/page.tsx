"use client";
import React from "react";
import GoogleCalendarButton from "@/components/GoogleComponentButton";

type Props = object; // Propsの型をここに定義

const MyComponent: React.FC<Props> = () => {
  const formData = [
    { label: "サブスク名", value: "" },
    { label: "サブスク期間", value: "" },
    { label: "金額", value: "" },
    { label: "更新頻度", value: "" },
    { label: "利用頻度", value: "" },
  ];
  const eventTitle = "打ち合わせ";
  const description = "クライアントとの定例ミーティング";
  const location = "Zoom";
  const start = new Date("2025-05-10T15:00:00+09:00");
  const end = new Date("2025-05-10T16:00:00+09:00");

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
        {/* コンポーネントの内容をここに記述 */}
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
            style={{
              width: "80%",
              height: "40px",
              padding: "10px",
              borderRadius: "8px",
              marginBottom: "15px",
            }}
          >
            <option>NetFlix</option>
            <option>AmazonPrime</option>
            <option>その他</option>
          </select>

          {formData.map((item) => (
            <div
              key={item.label}
              style={{
                color: "gray",
                width: "300px",
                padding: "10px",
                borderRadius: "10px",
                marginBottom: "15px",
                margin: "auto",
              }}
            >
              {item.label}
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
              />
            </div>
          ))}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginTop: 10,
          marginBottom: 30,
        }}
      >
        <GoogleCalendarButton
          title={eventTitle}
          description={description}
          location={location}
          startTime={start}
          endTime={end}
        />
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <button
          style={{
            backgroundColor: "white",
            border: "3px solid #3C6E71",
            borderRadius: "7px ",
            width: 150,
            height: 40,
            fontSize: 22,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          登録
        </button>
      </div>
    </div>
  );
};

export default MyComponent;
