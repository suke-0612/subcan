import Image from "next/image";

// ログインページコンポーネント
export default function LoginPage() {
  return (
    <div>
      <div
        style={{
          backgroundColor: "#fff",
          padding: "32px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "32px",
          }}
        >
          <div
            style={{
              width: "48px",
              height: "48px",
              backgroundColor: "#B35F5F",
              borderRadius: "8px",
              marginRight: "12px",
            }}
          />
          <h1 style={{ fontSize: "24px", fontWeight: "bold" }}>サブキャン</h1>
        </div>
        <div>
          <p
            style={{
              marginBottom: "16px",
              textAlign: "start",
              fontWeight: "bold",
            }}
          >
            今すぐ参加しましょう
          </p>
        </div>

        <button
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "12px",
            borderRadius: "24px",
            border: "1px solid #333",
            backgroundColor: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          <Image
            width={20}
            height={20}
            src="/images/google.png"
            alt="Google"
            style={{ width: "20px", height: "20px", marginRight: "8px" }}
          />
          Googleで登録
        </button>

        <p style={{ marginBottom: "12px" }}>または</p>

        <button
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "32px",
            borderRadius: "24px",
            border: "1px solid #333",
            backgroundColor: "#fff",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          アカウントを作成
        </button>

        {/* ログイン案内 */}
        <div>
          <p
            style={{
              marginBottom: "12px",
              textAlign: "start",
              fontWeight: "bold",
            }}
          >
            アカウントをお持ちの方
          </p>
        </div>

        {/* ログインボタン */}
        <button
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "24px",
            border: "none",
            backgroundColor: "#497171",
            color: "#fff",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          ログイン
        </button>
      </div>
    </div>
  );
}
