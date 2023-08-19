
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
    const [apiList,setApiList] = useState([]);

    // (2) マウント時にapiを読み込む宣言
    useEffect(() => {
      fetchApi().then((newImage) => {
        const newItems = [];
        for(let i = 0;i < 3 && i < Object.keys(newImage).length;i++){
          const time0 =new Date( newImage[i]["commit"]["committer"]["date"] );
          const tokyoTime = time0.toLocaleString('ja-jp');
          newItems.push({//setApiListは非同期なので、ループ内で使うとうまく行かないことがある
            date: tokyoTime,
            message: newImage[i]["commit"]["message"],
          });

        }
        setApiList(newItems); // 全てのアイテムを一度に設定する
        setLoading(false); // ローディング状態を更新する
      });
    }, []);
    // (3) ローディング中でなければ、apiの結果を表示する
    return (
    <div>
      <ResponsiveAppBar/>

      <div className={styles.page}>
        <h1>最終更新</h1>
        {apiList.map((api,index)=>(
          <div>
            <span className={styles.text_primary2}>{api.date}</span>
            {api.message}
          </div>
        ))}

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

    console.log(Object.keys(images).length);

    return images;
  };

