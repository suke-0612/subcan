import React from "react";
// グラフに表示する用の簡易的なデータ
export type PieData = {
  id: string;
  icon: string;
  name: string;
  value: number;
};

const Card: React.FC<PieData> = (props) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "8px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <img
            src={props.icon}
            alt={`${props.name} icon`}
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "8px",
              marginRight: "12px",
            }}
          ></img>
          <p style={{ color: "#333", fontSize: "20px", margin: 0 }}>
            {props.name}
          </p>
        </div>
        <p style={{ fontSize: "18px", fontWeight: "bold", margin: 0 }}>
          ¥{props.value.toLocaleString()}
        </p>
      </div>

      <div style={{ textAlign: "right" }}>
        <a
          href={`/detail/${props.id}`}
          style={{
            color: "#3C6E71",
            fontSize: "14px",
            textDecoration: "underline",
          }}
        >
          詳細ページへ
        </a>
        <p style={{ border: "0.5px solid" }}></p>
      </div>
    </div>
  );
};

export default Card;
