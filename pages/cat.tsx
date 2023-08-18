import { GetServerSideProps, NextPage } from "next";
import { useEffect, useState } from "react";
import styles from "./index.module.css";

import {ResponsiveAppBar}from "../Components/ResponsiveAppBar";
type Props = {
    initialImageUrl: string;
}

const IndexPage: NextPage<Props> = ({ initialImageUrl }) => {
    const [imageUrl, setImageUrl] = useState(initialImageUrl);
    const [loading, setLoading] = useState(false);
    //マウント時に画像を読み込む
    // useEffect(() => {//useEffectはreactの関数
    //     fetchImage().then((newImage) => {
    //         setImageUrl(newImage.url);
    //         setLoading(false);
    //     });
    // }, []);//第２引数にからの配列がある。

    //ボタンを押したときに画像を読み込む処理
    const handleClick = async () => {
        setLoading(true);//読み込み中フラグ
        const newImage = await fetchImage();
        setImageUrl(newImage.url);
        setLoading(false);
    };
    return (
        <div>
            <ResponsiveAppBar/>
        <div className={styles.page}>

            {/* <button onClick={handleClick}className={styles.button}>
                他のにゃんこも見る */}
            {/* <button
                onClick={handleClick}
                style={{
                    backgroundColor: "#319795",
                    border: "none",
                    borderRadius: "4px",
                    color: "white",
                    padding: "4px 8px",
                }}
            >
                きょうのにゃんこ🐱nn
            </button> */}
             <button onClick={handleClick} className={styles.button}>
                他のにゃんこも見る
            </button>
            <div className={styles.frame}>
                {loading || <img src={imageUrl} className={styles.img} alt="画像"/>}
            </div>

        </div>
        </div>
    );
};
export default IndexPage;

//サーバーサイドで実行する処理
export const getServerSideProps: GetServerSideProps<Props> = async () => {
    const image = await fetchImage();
    return {
        props: {
            initialImageUrl: image.url,
        },
    };

};


type Image = {
    url: string;
}

const fetchImage = async (): Promise<Image> => {
    const res = await fetch("https://api.thecatapi.com/v1/images/search");
    const images = await res.json();

    return images[0];
}
/*
apiの返り値は以下の通りなので、[0]が必要
    複数の画像を返却することも想定されている？
[
  {
    "id": "c7h",
    "url": "https://cdn2.thecatapi.com/images/c7h.jpg",
    "width": 820,
    "height": 883
  }
]
*/