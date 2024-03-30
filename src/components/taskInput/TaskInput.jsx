import React, { useEffect, useState } from "react";
import styles from "./TaskInput.module.css";
import {useDispatch,useSelector} from 'react-redux';
import { addTodo } from "../../features/todo/todoSlice";

function TaskInput() {
  //input state variable to store user input
  const [input, setInput] = useState('');
  // useSelector function of redux to retrieve data from redux store 
  const todos = useSelector((state) => state.todos);
  // dispatch function of redux to make updation to our redux store
  const dispatch = useDispatch();

  ///handler function to add todo to the redux store with the input text
  const addtodoHandler = (e) =>{
      e.preventDefault();
      dispatch(addTodo(input));
      setInput('');
  }
  //useEffect hook to store the todos data coming from redux store to save 
  // in the local storage
  useEffect(() =>{
    if(todos.length > 0){
      const jsonArray = JSON.stringify(todos);
      localStorage.setItem('todos', jsonArray);
    }
  },[input,todos])

  return (
    <div>
      <h1 className={styles.textMain}>Todo App</h1>
      <form onSubmit={addtodoHandler}>
      <h2 className={styles.textSec}>Add Todo Here :</h2>
        <input
          type="text"
          className={styles.addInput}
          placeholder="Type here"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button className={styles.addBtn}>ADD</button>
      </form>
    </div>
  );
}

export default TaskInput;
