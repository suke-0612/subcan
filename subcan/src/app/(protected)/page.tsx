"use client";

import SubscriptionList from "@/app/(protected)/subscriptionList/page";

import NotificationPermission from "./_components/NotificationPermission";

export default function Home() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <NotificationPermission />
      <SubscriptionList />
    </div>
  );
}
