
import { NextPage } from "next";
import { useEffect, useState } from "react";
import { ResponsiveAppBar } from "../Components/ResponsiveAppBar";
import styles from "./index.module.css";

import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';

import UpdateIcon from '@mui/icons-material/Update';

const HogePage: NextPage = () => {
    // (1) useStateを使って状態を定義する

    const [dateCommit,setDateCommit] = useState("");
    const [loading, setLoading] = useState(true);
    const [date,setDate] = useState("");
    const [apiList,setApiList] = useState([]);
    const currentDate0 : any = new Date();// 現在の日付
    const currentDate = currentDate0.toLocaleString('ja-jp');
    console.log(currentDate);

    // ミリ秒を1週間に変換（ミリ秒 * 秒 * 分 * 時 * 日 * 週）
    const oneWeekInMilliseconds  = 1000 * 60 * 60 * 24 * 7;

    // (2) マウント時にapiを読み込む宣言
    useEffect(() => {
      fetchApi().then((newImage) => {
        const newItems = [];
        for(let i = 0;i < 3 && i < Object.keys(newImage).length;i++){
          const time0 =new Date( newImage[i]["commit"]["committer"]["date"] );
          // console.log("t0-c0", currentDate0 - time0);現在とその時の時間の差

          const tokyoTime = time0.toLocaleString('ja-jp');//日本の時間に変換
          // console.log(tokyoTime);
          newItems.push({//setApiListは非同期なので、ループ内で使うとうまく行かないことがある
            date: tokyoTime,
            message: newImage[i]["commit"]["message"],
            rawDate :time0,
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
            <span className={styles.default_badge}>{api.date}</span>

            {( currentDate0-api.rawDate)<= oneWeekInMilliseconds ?(//１週間以内である
              <Badge badgeContent="new" color="primary">
                {api.message}<UpdateIcon/>
              </Badge>
            ):(
              <span>{api.message}</span>
            )}

            {/* {api.message} */}

          </div>
        ))}

      </div>
    </div>);
};
export default HogePage;

type ApiType = {
    resJson:string;
}


const fetchApi = async ():Promise<ApiType> => {
    const res = await fetch("https://api.github.com/repos/mizugame634978/vercel_test/commits");//コミット履歴を最大３０件取得
    const resJsons = await res.json();//jsonに変換

    return resJsons;//型チェックをしつつ返す
  };

