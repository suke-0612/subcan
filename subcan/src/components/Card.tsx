import React from "react";
import { Subscription } from "@/types/Subscriptions";

const Card: React.FC<Subscription> = (props) => {
  return (
    <a
      href={props.id}
      style={{
        display: "flex",
        alignItems: "center",
        backgroundColor: "#353535",
        width: "100%",
        minHeight: "120px",
        margin: "15px auto",
        borderRadius: "5px",
        textDecoration: "none",
      }}
    >
      {/* アイコン部分 */}
      <div
        style={{ padding: "10px", width: "40%", textAlign: "center", flex: 4 }}
      >
        {props.icon && (
          <img
            src={props.icon}
            alt={`${props.name} icon`}
            style={{
              maxWidth: "80%",
              maxHeight: "80%",
              backgroundColor: "white",
              borderRadius: "13px",
            }}
          />
        )}
        {!props.icon && (
          <div
            style={{
              color: "white",
              fontSize: "20px",
              width: "90px",
              height: "90px",
              marginLeft: "auto",
              backgroundColor: "#3c6e71",
            }}
          >
            <p style={{ margin: "0 auto", fontSize: "50px" }}>
              {props.name[0]}
            </p>
          </div>
        )}
      </div>

      {/* サブスク名・金額部分 */}
      <div
        style={{
          padding: "10px",
          color: "white",
          textAlign: "center",
          flex: 6,
        }}
      >
        <span
          style={{
            fontSize: props.name.length <= 20 ? 23 : 18,
            wordBreak: "break-word",
          }}
        >
          {props.name}
        </span>

        <span
          style={{
            fontSize: "20px",
            textDecorationLine: "underline",
            display: "block",
          }}
        >
          &yen;{props.fee.toLocaleString()}
        </span>
      </div>
    </a>
  );
};

export default Card;
