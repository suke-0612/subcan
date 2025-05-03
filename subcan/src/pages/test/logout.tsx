import { useRouter } from "next/router";
import { signOut } from "firebase/auth";
import { auth } from "@/libs/firebase";

export default function LogoutPage() {
  const router = useRouter();

  const doLogout = async () => {
    try {
      await signOut(auth);
      router.replace("/login"); // ログアウト後にログインページへ遷移
    } catch (error) {
      console.error("ログアウトに失敗しました:", error);
    }
  };

  return <button onClick={doLogout}>ログアウト</button>;
}
