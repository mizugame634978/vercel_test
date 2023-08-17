import { GetServerSideProps, NextPage } from "next";
import { useEffect, useState } from "react";
import styles from "./index.module.css";
import { Header } from "../Components/Header";
import { ResponsiveAppBar } from "../Components/ResponsiveAppBar";
type Props = {
    initialImageUrl: string;
}

const DogPage: NextPage<Props> = ({ initialImageUrl }) => {
    //apiを叩いた返り値が引数で来ている
    const [imageUrl, setImageUrl] = useState(initialImageUrl);
    const [loading, setLoading] = useState(false);

    //ボタンを押したときに画像を読み込む処理
    const handleClick = async () => {
        setLoading(true);//読み込み中フラグ
        const newImage = await fetchImage();
        setImageUrl(newImage.message);
        setLoading(false);
    };
    return (
        <div>
            <ResponsiveAppBar/>
        <div className={styles.page}>

            <button
                onClick={handleClick}className={styles.dog_button}
            >
                きょうのイッヌ🐶
            </button>
            <div className={styles.frame}>
                {loading || <img src={imageUrl} className={styles.img} alt="画像"/>}
            </div>

        </div>
        </div>
    );
};
export default DogPage;

//サーバーサイドで実行する処理
export const getServerSideProps: GetServerSideProps<Props> = async () => {
    const image = await fetchImage();


    return {
        props: {
            initialImageUrl: image.message,
        },
    };

};


type Image = {
    message: string;
}

const fetchImage = async (): Promise<Image> => {
    const res = await fetch("https://dog.ceo/api/breeds/image/random");
    const images = await res.json();

    return images;
}
/*
apiの返り値は以下の通りなので[0]入らない
 {
  "message": "https://images.dog.ceo/breeds/germanshepherd/n02106662_7960.jpg",
  "status": "success"
}
 */