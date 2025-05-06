"use client";
import Loading from "@/components/Loading";
import { changeSubscriptionInfo, getSubscription } from "@/libs/firestore";
import { EditSubscription } from "@/types/Subscriptions";
import { useSession } from "next-auth/react";
import { redirect, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

type Props = {
  // Propsの型をここに定義
};

const inputWithLabel: React.FC<Props> = (props) => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [prevData, setPrevData] = useState<EditSubscription>();
  const [edit, setEdit] = useState<EditSubscription>();

  const { data: session } = useSession();

  useEffect(() => {
    if (!id) return;

    if (session?.user?.uid) {
      getSubscription(session.user.uid, id).then(
        (data) => {
          setEdit(data);
          setPrevData(data);
        },
        (err) => console.error(err)
      );
    }
  }, [session?.user?.uid]);

  const handleEditInfo = () => {
    if (!edit || !session?.user?.uid) return;

    changeSubscriptionInfo(edit).then((_) => {
      // 詳細ページに戻る
      redirect("/" + id);
    });
  };

  const selectDivStyle: React.CSSProperties = {
    width: "100%",
    boxSizing: "border-box",
    padding: "8px 10px",
    borderRadius: "6px",
    border: "1.5px solid #ccc",
    fontSize: "16px",
    marginTop: "8px",
  };

  const labelStyle: React.CSSProperties = {
    fontSize: "15px",
    fontWeight: "bold",
    marginBottom: "4px",
  };

  const sectionStyle: React.CSSProperties = {
    marginBottom: "20px",
  };

  if (!id) {
    return <div>サブスクIDを指定してください</div>;
  }

  if (!edit) {
    return <Loading />;
  }

  return (
    <div style={{ display: "block", paddingTop: "60px" }}>
      <div
        style={{
          margin: "0 auto",
          padding: "24px",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
          サブスク情報修正
        </h2>

        {/* サブスク名 */}
        <div style={sectionStyle}>
          <label style={labelStyle}>サブスク名</label>
          <input
            type="text"
            style={selectDivStyle}
            value={edit?.name}
            onChange={(e) => setEdit({ ...edit, name: e.target.value })}
          />
        </div>

        {/* 支払い頻度 */}
        <div style={sectionStyle}>
          <label style={labelStyle}>支払い頻度</label>
          <select
            style={selectDivStyle}
            value={edit?.payment_period}
            onChange={(e) =>
              e.target.value &&
              setEdit({ ...edit, payment_period: Number(e.target.value) })
            }
          >
            <option value="1">１か月</option>
            <option value="2">３か月</option>
            <option value="3">６か月</option>
            <option value="4">１２か月</option>
          </select>
        </div>

        {/* 金額 */}
        <div style={sectionStyle}>
          <label style={labelStyle}>金額 (円)</label>
          <input
            type="number"
            style={selectDivStyle}
            value={edit?.fee}
            onChange={(e) =>
              e.target.value &&
              setEdit({ ...edit, fee: Number(e.target.value) })
            }
          />
        </div>

        {/* 利用頻度 */}
        <div style={sectionStyle}>
          <label style={labelStyle}>利用頻度</label>
          <select
            style={selectDivStyle}
            value={edit?.frequency}
            onChange={(e) =>
              e.target.value &&
              setEdit({ ...edit, frequency: Number(e.target.value) })
            }
          >
            <option value="">選択してください</option>
            <option value="1">毎日</option>
            <option value="2">週に数回</option>
            <option value="3">一か月に数回</option>
            <option value="4">一年に数回</option>
          </select>
        </div>

        {/* 解約URL */}
        <div style={sectionStyle}>
          <label style={labelStyle}>解約URL</label>
          <input
            type="text"
            style={selectDivStyle}
            value={edit?.cancel_url ?? ""}
            onChange={(e) =>
              e.target.value && setEdit({ ...edit, cancel_url: e.target.value })
            }
          />
        </div>

        <br />
        {/* 登録ボタン */}
        <div style={{ textAlign: "center" }}>
          <button
            style={{
              backgroundColor: "#3C6E71",
              color: "white",
              border: "none",
              borderRadius: "8px",
              width: "100%",
              height: "44px",
              fontSize: "18px",
              fontWeight: "bold",
              cursor: "pointer",
              transition: "background 0.3s",
            }}
            onClick={handleEditInfo}
          >
            修正完了
          </button>
        </div>
      </div>
    </div>
  );
};

export default inputWithLabel;
