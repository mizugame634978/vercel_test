
import { useState } from 'react';
import { ResponsiveAppBar } from "../Components/ResponsiveAppBar";
import { InputForm } from "../Components/InputForm";
import { TodoList } from "../Components/TodoList";
import styles from "./index.module.css";
// import todoStyles from  './todo.module.css';
function App() {
  const[taskList,setTaskList] = useState([]);
  return (
    <div>
      <ResponsiveAppBar/>
      <div className={styles.page_todo}>
        <InputForm taskList={taskList} setTaskList={setTaskList} />
        <TodoList taskList={taskList} setTaskList={setTaskList} />
      </div>
    </div>

  );
}

export default App;
