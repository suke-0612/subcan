import styles from "./page.module.css";
import SubscriptionList from "@/app/subscriptionList/page";

export default function Home() {
  return (
    <div className={styles.page}>
      <SubscriptionList />
    </div>
  );
}
