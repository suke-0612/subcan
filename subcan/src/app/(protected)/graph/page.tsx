"use client";
import { useSession } from "next-auth/react";
import Card, { PieData } from "./components/Card";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useEffect, useState } from "react";
import { getSubscriptionList } from "@/libs/firestore";
import Loading from "@/components/Loading";

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#AF19FF",
  "#FF4560",
  "#00BFFF",
  "#FF6347",
  "#32CD32",
  "#FFD700",
  "#FF69B4",
  "#8A2BE2",
  "#FF4500",
];

export default function GraphPage() {
  const [subscList, setSubscList] = useState<PieData[] | undefined>();

  // uid取得と更新
  const { data: session } = useSession();
  useEffect(() => {
    if (session?.user?.uid) {
      getSubscriptionList(session.user.uid).then(
        (data) => {
          setSubscList(
            data.map((elem) => ({
              id: elem.id,
              name: elem.name,
              value: elem.fee,
              icon: elem.icon,
            }))
          );
        },
        (err) => {
          console.error(err);
        }
      );
    }
  }, [session?.user?.uid]);

  if (!subscList) {
    return <Loading />;
  }

  return (
    <div
      style={{
        maxWidth: "500px",
        margin: "0 auto",
        backgroundColor: "#fff",
        padding: "16px",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "24px" }}>
        サブスク費用割合
      </h2>

      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={subscList}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius="80%"
              fill="#8884d8"
              label
            >
              {subscList.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div
        style={{
          marginTop: "30px",
          display: "flex",
          flexDirection: "column",
          gap: "12px",
        }}
      >
        <p style={{ border: "0.5px solid" }}></p>
        {subscList.map((elem) => (
          <div key={elem.id} style={{ width: "100%" }}>
            <Card {...elem} />
          </div>
        ))}
      </div>
    </div>
  );
}
