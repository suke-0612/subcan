"use client";
import React from "react";
import { useState } from "react";
import Link from "next/link";

function barStyle(open: boolean, index: number): React.CSSProperties {
  const common: React.CSSProperties = {
    height: "2px",
    background: "white",
    margin: "6px 0",
    transition: "0.4s",
  };

  if (!open) return { ...common };

  if (index === 1) {
    return {
      ...common,
      transform: "rotate(45deg) translate(6px, 6px)",
    };
  }
  if (index === 2) {
    return {
      ...common,
      opacity: 0,
    };
  }
  if (index === 3) {
    return {
      ...common,
      transform: "rotate(-45deg) translate(7px, -7px)",
    };
  }

  return common;
}

type Props = object;

const Header: React.FC<Props> = () => {
  const [open, setOpen] = useState(false);
  const headerList = [
    { name: "一覧", path: "/" },
    { name: "サブスク登録", path: "/register" },
    { name: "アカウント", path: "/account" },
    { name: "グラフ", path: "/graph" },
    { name: "サブスク仕分け", path: "/check" },
  ];

  return (
    <div>
      <div
        style={{
          display: "flex",
          position: "fixed",
          top: 0,
          left: 0,
          padding: "24px 16px",
          width: "100%",
          zIndex: 1000,
          backgroundColor: "#284B63",
        }}
      />

      <div>
        <button
          onClick={() => setOpen(!open)}
          style={{
            width: "35px",
            height: "30px",
            zIndex: 1001,
            background: "transparent",
            border: "none",
            cursor: "pointer",
            position: "fixed",
            top: 10,
            right: 15,
          }}
        >
          <div style={barStyle(open, 1)} />
          <div style={barStyle(open, 2)} />
          <div style={barStyle(open, 3)} />
        </button>
      </div>

      <nav
        style={{
          position: "fixed",
          top: 0,
          right: open ? 0 : "-100%",
          height: "100vh",
          backgroundColor: "#DDDDDD",
          padding: "0 20px",
          boxSizing: "border-box",
          zIndex: 5,
          transition: "right 0.3s ease",
        }}
      >
        <div
          style={{
            marginTop: "70px",
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
            justifyContent: "start",
            height: "100%",
          }}
        >
          {headerList.map((item, index) => (
            <div
              key={index}
              onClick={() => setOpen(false)}
              style={{
                width: "100%",
                borderBottom: "1px solid #999",
                paddingBottom: "10px",
                marginBottom: "10px",
              }}
            >
              <Link
                href={item.path}
                style={{
                  textDecoration: "none",
                  color: "inherit",
                  display: "inline-block",
                  width: "100%",
                }}
              >
                {item.name}
              </Link>
            </div>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default Header;
