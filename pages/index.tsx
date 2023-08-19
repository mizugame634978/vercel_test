// import { log } from "console";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import { ResponsiveAppBar } from "../Components/ResponsiveAppBar";
import styles from "./index.module.css";


const HogePage: NextPage = () => {
    // (1) useStateを使って状態を定義する
    // const [dateCommit,setDateCommit] = useState("");
    const [dateCommit,setDateCommit] = useState("");
    const [loading, setLoading] = useState(true);
    const [date,setDate] = useState("");

    // (2) マウント時にapiを読み込む宣言
    useEffect(() => {
      fetchApi().then((newImage) => {

        const time0 =new Date( newImage[0]["commit"]["committer"]["date"] );
        // const hoge = time0.toLocaleDateString('en-jp',{ weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' });
        const japanTime:String = time0.toLocaleString('ja-jp');//2023-08-18T06:33:34Zが2023/8/18 15:33:34になった、＋９時間されてる


        setDateCommit(newImage[0]["commit"]["message"]);
        setDate(String(japanTime));
        setLoading(false); // ローディング状態を更新する
      });
    }, []);
    // (3) ローディング中でなければ、apiの結果を表示する
    return (
    <div>
      <ResponsiveAppBar/>
      <div className={styles.page}>
        <h1>最終更新</h1>
        <div>{date}</div>
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

