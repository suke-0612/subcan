export interface Subscription {
  user_id: string; // ユーザーID
  name: string; // サブスク名
  fee: number; // 料金
  payment_starts_at: string; // 支払い開始日
  payment_period: string; // 支払い期間
  last_payment_date: string | null; // 最後の支払日
  frequency: number; // ユーザーの利用頻度
  icon: string; // アイコンへのパス
  trial_period: string; // 無料期間
  cancel_url: string | null; // 解約先URL
  created_at: string;
  updated_at: string;
}

export interface CheckSubscription {
  id: string;
  name: string;
  fee: number;
  icon: string;
}
