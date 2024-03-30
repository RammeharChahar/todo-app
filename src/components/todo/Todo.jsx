import React from 'react';
import TaskInput from '../taskInput/TaskInput';
import TaskList from '../taskList/TaskList';
import styles from "./Todo.module.css";

//import our two functional component and render using Todo functional component

function Todo() {
  return (
    <div className={styles.todoWrapper}>
       <TaskInput />
       <TaskList />
     </div>
  )
}

export default Todo