import React, { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import styles from "./index.module.css";

export const InputForm = ({ taskList, setTaskList }) => {
  const [inputText, setInputText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault(); //再レンダリングの機能がなくなる
    if (inputText !== "") {
      // タスクを追加
      setTaskList([
        //taskListの一番うしろにinputTextを追加
        ...taskList, //スプレッド構文
        {
          id: String(uuidv4()), //ユニークなid（乱数と違って重複する可能性がない）,数値だとbeautiful-dndがエラー起こすのでstr
          text: inputText,
          completed: false,
        },
      ]);
      setInputText("");
    }
  };
  const hadleChange = (e) => {
    //文字を打ち込んだ際、１文字ごとに実行
    setInputText(e.target.value);
    // console.log(inputText);
  };
  return (
    <div >
      <form onSubmit={handleSubmit}>
        {/*サブミット状態の中身を処理する  */}
        {/* <input type="text" onChange={hadleChange} value={inputText} /> */}
        <TextField id="standard-basic"  variant="standard"  onChange={hadleChange}value={inputText} />
        <AddCircleOutlineIcon/>

      </form>{" "}
    </div>
  );
};
