import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/libs/firebase";
import { useAuth } from "../../contexts/AuthContext";

export default function LoginPage() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!loading && user) {
      router.replace("/"); // ← ログイン済みならトップへ遷移
    }
  }, [user, loading, router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/"); // ログイン成功後もトップへ遷移
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("ログインに失敗しました。");
      }
    }
  };

  if (loading || user) {
    return <div>Loading...</div>; // ログイン状態確認中またはログイン済み
  }

  return (
    <div>
      <h1>ログイン</h1>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="メールアドレス"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="パスワード"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">ログイン</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
}
