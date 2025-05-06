import admin from "firebase-admin";
import * as functions from "firebase-functions";

// Admin SDKでfireStoreを使う
admin.initializeApp(functions.config().firebase);

// データベースの参照を取得する
const fireStore = admin.firestore();
