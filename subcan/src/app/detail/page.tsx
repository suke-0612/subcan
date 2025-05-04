// ログインページコンポーネント
export default function DetailPage() {
  return (
    <>
      サブスク名<br></br>
      <div style={{ textAlign: "right" }}>
        <button
          style={{
            width: "180px",
            height: "30px",
            backgroundColor: "white",
            borderRadius: "9px",
            padding: "0px 30px 0px 30px",
          }}
        >
          解約ページへ
        </button>
      </div>
      <table border={1} style={{ border: "2px solid gray" }}>
        <tr>
          <th>基本情報</th>
        </tr>
        <tr>
          <td>金額</td>
          <td>1</td>
        </tr>
        <tr>
          <td>次の引き落とし日</td>
          <td>2</td>
        </tr>
        <tr>
          <td>前回の引き落とし日</td>
          <td>3</td>
        </tr>
        <tr>
          <td>無料期間</td>
          <td>あと4</td>
        </tr>
      </table>
      <table border={1}>
        <tr>
          <th>最初に登録された情報</th>
        </tr>
        <tr>
          <td>サブスク名</td>
          <td>1</td>
        </tr>
        <tr>
          <td>サブスク期間</td>
          <td>2</td>
        </tr>
        <tr>
          <td>金額</td>
          <td>3</td>
        </tr>
        <tr>
          <td>更新頻度</td>
          <td>4</td>
        </tr>
        <tr>
          <td>何か</td>
          <td>5</td>
        </tr>
      </table>
      <div style={{ textAlign: "right" }}>
        <button
          style={{
            width: "180px",
            height: "30px",
            backgroundColor: "white",
            borderRadius: "9px",
            border: "2px solid #3c6e71",
            color: "#3c6e71",
            padding: "0px 20px 0px 20px",
          }}
        >
          情報の修正
        </button>
      </div>
    </>
  );
}
