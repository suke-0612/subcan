import React from "react";

type Props = {
  // Propsの型をここに定義
  name: string;
  price: number;
};

const Card: React.FC<Props> = (props) => {
  return (
    <div>
      <div style={{ display: "flex" }}>
        {/* コンポーネントの内容をここに記述 */}
        <img src="/globe.svg" alt="" style={{ width: "45px" }} />
        <p style={{ color: "black", fontSize: "30px", marginLeft: "10px" }}>
          {props.name}
        </p>
        <p style={{ fontSize: "30px", textAlign: "right", marginLeft: "80px" }}>
          {props.price}
        </p>
      </div>
      <a
        href={"https://www.google.co.jp"}
        style={{ color: "gray", marginLeft: "280px", fontSize: "20px" }}
      >
        詳細ページへ
      </a>
      <p style={{ border: "0.5px solid" }}></p>
    </div>
  );
};

export default Card;
