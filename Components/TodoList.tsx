import React from "react";
// ドラッグ＆ドロップのライブラリ
import { Droppable } from "react-beautiful-dnd";
import { Draggable } from "react-beautiful-dnd";
import { DragDropContext } from "react-beautiful-dnd";
//コンポーネント
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
//アイコン
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
//css
import todoStyles from  './todoList.module.css';
import styles from './todoList.module.css'


/*タスクリストを並び替える関数 */
const reorder = (list, startIndex, endIndex,setTaskList) => {
  // 配列のコピーを作成する
  const newList = [...list];

  // 並び替えるタスクを取り出す
  const removedTask = newList.splice(startIndex, 1)[0];//startIndexが消えた。
  //↑spliceの返り値削除された要素の配列。今回は１つのみ削除したので、[0]と指定すれば、削除されたものを取得できる

  // タスクを新しい位置に挿入する
  newList.splice(endIndex, 0, removedTask);//endIndexから数えて0個削除して、removeを挿入

  // 新しいタスクリストを状態として設定する
  setTaskList(newList);
};


export const TodoList = ({ taskList, setTaskList }) => {
  const handleDelete =(id)=>{
    //タスクを削除
    setTaskList(taskList.filter((task)=>task.id !== id));//filterはfalseだと除外する
    //今回はtask.idとidが等しかった場合、falseを返し、除外される
  }

  const handleCompleted=(id)=>{
    //取り消し線を追加
    setTaskList(taskList.map((task)=>{
      if(id===task.id){//idが等しい
        return {
          ...task,
          completed:!task.completed
        };
      }
      return task;
    }))
  };

  const onDragEnd = (result) => {//ドラッグ＆ドロップのなにか
    // console.log(result);
    //移動元のやつがlogの中のsource,移動先がdestinationのindexにある。（単語を配列と仮定してindexが振られる？）
    if (!result.destination) {
      //変なとこにドラッグした
      return;
    }

    reorder(taskList, result.source.index, result.destination.index,setTaskList);
  };

  return (
    <div className="todoList">
      <div className="todos">
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div{...provided.droppableProps}ref={provided.innerRef}>

                {taskList.map((task,index) => (
                  <Draggable key={task.id} draggableId={task.id} index={index}>
                    {(provided, snapshot) => (
                      <div key={index}ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}//providedがついているものはドラック＆ドロップ関連
                      >
                        <div >
                          <Button variant="text"  onClick={()=>handleCompleted(task.id)}
                            startIcon={task.completed ?  <CheckBoxIcon/>: <CheckBoxOutlineBlankIcon/>}
                          />
                          <span className={`${task.completed ? todoStyles.completed : ""}`}>
                            <span className={styles.todoText}>{task.text}</span>
                          </span>
                          <Button variant="text"  onClick={()=>handleDelete(task.id)} startIcon={<DeleteIcon/>}/>
                        </div>


                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
                {/*タスクを移動している時、背景の水色の表示をまともにする */}
              </div>

          )}
        </Droppable>
      </DragDropContext>
      </div>
    </div>

  );
};
