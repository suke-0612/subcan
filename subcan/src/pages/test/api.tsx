import { useState } from "react";

export default function TestApiPage() {
  const [a, setA] = useState<number>(0);
  const [b, setB] = useState<number>(0);
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setResult(null);

    try {
      const response = await fetch("/api/adder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ a, b }),
      });

      const data = await response.json();
      if (response.ok) {
        setResult(data.sum);
      } else {
        setError(data.error || "API error");
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("通信エラーが発生しました");
      }
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>API 加算テスト</h1>
      <p>/src/api/adder.ts　を叩いて結果を表示します</p>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          value={a}
          onChange={(e) => setA(Number(e.target.value))}
          placeholder="a"
        />
        <input
          type="number"
          value={b}
          onChange={(e) => setB(Number(e.target.value))}
          placeholder="b"
        />
        <button type="submit">送信</button>
      </form>

      {result !== null && <p>結果: {result}</p>}
      {error && <p style={{ color: "red" }}>エラー: {error}</p>}
    </div>
  );
}
