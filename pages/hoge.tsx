import { log } from "console";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import { ResponsiveAppBar } from "../Components/ResponsiveAppBar";
const HogePage: NextPage = () => {
    // ❶ useStateを使って状態を定義する
    const [imageUrl, setImageUrl] = useState("");
    const [loading, setLoading] = useState(true);
    // ❷ マウント時に画像を読み込む宣言
    useEffect(() => {
      fetchImage().then((newImage) => {
        console.log("ni::",newImage);
        setImageUrl(newImage.image); // 画像URLの状態を更新する
        setLoading(false); // ローディング状態を更新する
      });
    }, []);
    // ❸ ローディング中でなければ、画像を表示する
    return (
    <div>
      <ResponsiveAppBar/>
      {loading || <img src={imageUrl} />}
    </div>);
};
export default HogePage;

type Image = {
    image:string;
}


const fetchImage = async ():Promise<Image> => {
    const res = await fetch("https://randomfox.ca/floof/");
    const images = await res.json();
    console.log("fi::",images);
    return images;
  };

