// import { log } from "console";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import { ResponsiveAppBar } from "../Components/ResponsiveAppBar";
import styles from "./index.module.css";


const HogePage: NextPage = () => {
    // (1) useStateを使って状態を定義する
    const [dateCommit,setDateCommit] = useState("");
    const [loading, setLoading] = useState(true);
    const [date,setDate] = useState("");

    // (2) マウント時に画像を読み込む宣言
    useEffect(() => {
      fetchApi().then((newImage) => {
        const time0 =new Date( newImage[0]["commit"]["committer"]["date"] );
        const tokyoTimeOffset = 9 * 60 * 60 * 1000; // Tokyoのタイムゾーンオフセット（ミリ秒）
        const tokyoTime = new Date(time0.getTime() + tokyoTimeOffset); // Tokyoのローカルタイム
        console.log("ni::",newImage);
        setDateCommit(newImage[0]["commit"]["message"]);
        setDate(String(tokyoTime));
        setLoading(false); // ローディング状態を更新する
      });
    }, []);
    // (3) ローディング中でなければ、画像を表示する
    return (
    <div>
      <ResponsiveAppBar/>
      <div className={styles.page}>
        <h1>最終更新</h1>
        <div>{date}</div>
        <br />
        <div>{dateCommit}</div>
      </div>
    </div>);
};
export default HogePage;

type ApiType = {
    image:string;
}


const fetchApi = async ():Promise<ApiType> => {
    const res = await fetch("https://api.github.com/repos/mizugame634978/vercel_test/commits");
    const images = await res.json();
    console.log("fi::",images);
    return images;
  };

