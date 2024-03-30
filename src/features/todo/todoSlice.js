//import redux createSlice() function for creating slicer and nanoid to
// generate random unique id's
import { createSlice, nanoid } from "@reduxjs/toolkit";

// Retrieving data from local storage and populate to our redux store 
const todoArray = localStorage.getItem('todos');
var allTodosLocal = JSON.parse(todoArray);
if(!allTodosLocal){
    allTodosLocal = [];
}
console.log(allTodosLocal);

// intial value for our redux store 
const initialState = {
      todos : [...allTodosLocal]
}

// create slice for our redux store and add actions or reducers using slicer function
// e.g -> name of our store , intialstate and different reducers to achieve
// different functionality
export const todoSlice = createSlice({
    name : 'todo',
    initialState,
    reducers : {
        // Create todo object with id , text and completed property and push
        // to our store varaible todos
        addTodo : (state,action) => {
            const todo = {
                id : nanoid(),
                text : action.payload,
                completed : false
            }
            state.todos.push(todo);
        },
        // remove particular todo using the id recieved from user and then
        // filter our todos using state and remove by id
        removoTodo : (state,action) =>{
            state.todos = state.todos.filter((todo) => todo.id !== action.payload);
        },
        // updating completed property of todo object for particular todo task
        // using the id and update to true
        updateTodo : (state,action) =>{
            state.todos = state.todos.map(todo => {
                // Check if the current object's ID matches the ID you want to update
                if (todo.id === action.payload) {
                    // If the condition is true, update the 'isCompleted' property for this object
                    return { ...todo, completed : true };
                } else {
                    // If the condition is false, return the object as is without any changes
                    return todo;
                }
            });
        }
    }
})

// exporting our reducers actions
export const {addTodo,removoTodo,updateTodo} = todoSlice.actions;

export default todoSlice.reducer;