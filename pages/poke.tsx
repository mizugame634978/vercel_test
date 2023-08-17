import { GetServerSideProps, NextPage } from "next";
import { useEffect, useState } from "react";
import styles from "./index.module.css";
import { Header } from "../Components/Header";
import { ResponsiveAppBar } from "../Components/ResponsiveAppBar";
type Props = {
    inImageUrl: string
    inName:string,
    inHeight:number,
    inId : number,
}

const PokePage: NextPage<Props> = ({ inImageUrl,inName,inHeight,inId }) => {
    //apiを叩いた返り値が引数で来ている
    const [imageUrl, setImageUrl] = useState(inImageUrl);
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState(inName);
    const[height,setHeight] = useState(inHeight);
    const[id,setId] = useState(inId);

    //ボタンを押したときに画像を読み込む処理
    const handleClick = async () => {
        setLoading(true);//読み込み中フラグ
        const inJson = await fetchImage();
        setImageUrl(inJson["sprites"].front_default);
        setName(inJson["forms"][0].name);
        let tmp :number = inJson.height;
        tmp /= 10;
        setHeight(tmp);
        setId(inJson.id);
        setLoading(false);//読み込みが終わった
    };
    return (
        <div>
            <ResponsiveAppBar/>
            <div className={styles.page}>

                <button
                    onClick={handleClick}className={styles.dog_button}
                >
                    草むらをすすむ
                </button>
                <div className={styles.frame2}>
                    {loading || <img src={imageUrl} className={styles.img} alt="画像" />}
                </div>
                {loading|| <li>名前：{name}</li>}
                {loading|| <li>図鑑No:{id}</li>}
                {loading|| <li>高さ{height}m</li>}
            </div>
        </div>
    );
};
export default PokePage;

//サーバーサイドで実行する処理
export const getServerSideProps: GetServerSideProps<Props> = async () => {
    const inJson = await fetchImage();
    const image = inJson["sprites"];//画像URL

    const pkName = inJson["forms"][0];//["name"];
    let height : number=inJson["height"];
    height /= 10;
    const id = inJson["id"];




    return {
        props: {
            inImageUrl: image.front_default,
            inName:pkName.name,
            inHeight:height,
            inId : id
        },
    };

};


type Image = {
    front_default: string;
    name :string;
    height : number;
    id : number;
    //sprites:string;
}

const fetchImage = async (): Promise<Image> => {
    let a = Math.random()*492;//0 <= x <= 492の乱数
    a = Math.floor(a)+1;//シンオウ地方はアルセウスが493で最後

    let URL:string = "https://pokeapi.co/api/v2/pokemon/";
    URL += String(a);
    const res = await fetch(URL);
    const images = await res.json();

    //return images.sprites;
    return images;
}
