// import { Kosugi_Maru } from "next/font/google";
import React from "react";

type Props = {
  // Propsの型をここに定義
  content: string;
  value: number;
  handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
};
const FrequencyButton: React.FC<Props> = (props) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        margin: 30,
      }}
    >
      <button
        value={props.value}
        style={{
          backgroundColor: "white",
          color: "#3C6E71",
          border: "2px solid #3C6E71",
          borderRadius: "12px",
          width: "250px",
          height: "55px",
          fontSize: "20px",
          fontWeight: 600,
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          cursor: "pointer",
          transition: "all 0.2s ease-in-out",
        }}
        onClick={props.handleClick}
      >
        {props.content}
      </button>
    </div>
  );
};
export default FrequencyButton;
