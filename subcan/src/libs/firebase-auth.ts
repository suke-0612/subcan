import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth as firebaseAuth } from "./firebase";
import {
  signIn as signInWithNextAuth,
  signOut as signOutWithNextAuth,
} from "next-auth/react";

export function logInWithFirebaseAuth() {
  const provider = new GoogleAuthProvider();

  signInWithPopup(firebaseAuth, provider)
    .then(async ({ user }) => {
      if (user) {
        const refreshToken = user.refreshToken;
        const idToken = await user.getIdToken();
        await signInWithNextAuth("credentials", {
          idToken,
          refreshToken,
          callbackUrl: `/`,
        });
      }
    })
    .catch((error) => {
      console.error("Error Sing In with Google", error);
    });
}

export function logOutWithFirebaseAuth() {
  firebaseAuth
    .signOut()
    .then(() => {
      signOutWithNextAuth({ callbackUrl: `/login` }); //ログアウト後に遷移する画面の指
    })
    .catch((error) => {
      console.error("Error Sign Out with Google", error);
    });
}
