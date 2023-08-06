//next arrow functionでnaf + tab
import styles from "./index.module.css";
import { GetServerSideProps } from "next";
import { useState } from "react";
import { ResponsiveAppBar } from "../Components/ResponsiveAppBar";

const bmi = () => {
  const [bmi, setBmi] = useState(0);
  const [height, setHeight] = useState(0);
  const [weight, setWeight] = useState(0);
  const calcBmi = () => {
    const meters: number = height / 100;
    console.log("meters", meters);
    const tmp: number = weight / (meters * meters);
    const tmp2: number = Number(tmp.toFixed(2));
    setBmi(tmp2);
  };
  const handleSubmit = (e) => {
    setHeight(e.target.value);
    console.log("height", e.target.value);
  };
  const handleSubmit2 = (e) => {
    setWeight(e.target.value);
    console.log("weight", e.target.value);
  };

  return (
    <div>
      <ResponsiveAppBar />
      <div className={styles.page}>
        <div className="inputForm">
          <form>
            {/*サブミット状態の中身を処理する  */}
            身長
            <input type="text" onChange={handleSubmit} />
            cm
          </form>
        </div>
        <div className="inputForm">
          <form>
            体重
            {/*サブミット状態の中身を処理する  */}
            <input type="text" onChange={handleSubmit2} />
            kg
          </form>
        </div>
        <button onClick={calcBmi}>calc</button>
        <div>あなたのbmiは{bmi}です</div>
      </div>
    </div>
  );
};

export default bmi;
