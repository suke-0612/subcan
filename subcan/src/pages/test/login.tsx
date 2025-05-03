// React の useEffect, useState フックをインポート
import { useEffect, useState } from "react";
// Next.js のページ遷移用ルーターをインポート
import { useRouter } from "next/router";
// Firebase の email/password ログイン関数をインポート
import { signInWithEmailAndPassword } from "firebase/auth";
// Firebase の初期化済み auth オブジェクトをインポート
import { auth } from "@/libs/firebase";
// カスタム AuthContext（ログイン状態を共有する）から useAuth フックをインポート
import { useAuth } from "../../contexts/AuthContext";

// ログインページコンポーネント
export default function LoginPage() {
  // Next.js のルーターオブジェクト（ページ遷移に使う）
  const router = useRouter();

  // useAuth により現在のユーザー情報とローディング状態を取得
  const { user, loading } = useAuth();

  // 入力されたメールアドレスとパスワードを保持する state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // エラーメッセージを表示するための state
  const [error, setError] = useState("");

  // ログイン済みかどうかを監視し、済みであればトップページにリダイレクト
  useEffect(() => {
    if (!loading && user) {
      router.replace("/"); // トップページへ遷移（replace により戻るボタンで戻れなくする）
    }
  }, [user, loading, router]); // user または loading が変化するたびに実行

  // フォーム送信時のログイン処理
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault(); // フォームのデフォルト送信（リロード）を無効化
    try {
      // Firebase Auth を用いたログイン処理
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/"); // 成功したらトップページに遷移
    } catch (err) {
      // エラーがあればメッセージを表示
      if (err instanceof Error) {
        setError(err.message); // エラーメッセージを表示
      } else {
        setError("ログインに失敗しました。"); // 一般的なメッセージ
      }
    }
  };

  // ログイン状態を確認中、またはすでにログイン済みの場合は「Loading...」を表示
  if (loading || user) {
    return <div>Loading...</div>;
  }

  // ログインフォームの描画
  return (
    <div>
      <h1>ログイン</h1>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="メールアドレス"
          value={email} // 入力された値を state に反映
          onChange={(e) => setEmail(e.target.value)} // 入力内容が変更されたら更新
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

      {/* エラーがある場合は表示 */}
      {error && <p>{error}</p>}
    </div>
  );
}
