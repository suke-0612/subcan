import React from "react";

const Loading: React.FC = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "60vh",
        color: "#3C6E71",
      }}
    >
      <div className="loader" />
      <p style={{ marginTop: "16px", fontSize: "18px" }}>読み込み中...</p>
      <style jsx>{`
        .loader {
          width: 40px;
          height: 40px;
          border: 4px solid #3c6e71;
          border-top: 4px solid transparent;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};
export default Loading;
