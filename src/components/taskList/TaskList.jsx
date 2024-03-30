import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removoTodo, updateTodo } from "../../features/todo/todoSlice";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";
import CheckBoxOutlineWhiteIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import styles from "./TaskList.module.css";

function TaskList() {
  const [isCompleted, setIsCompleted] = useState();
  var allTodosLocal = JSON.parse(localStorage.getItem("todos"));
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  ///function to update the particular task with unique id to completed state
  const handleCheckboxChange = (id) => (event) => {
    setIsCompleted(id);
  };

  //function to delete particular task from local storage
  const deleteTodoFromLocal = (id) => {
    // Find the index of the object with the ID
    var indexToDelete = allTodosLocal.findIndex(function (item) {
      return item.id === id;
    });

    // Check if the index was found (-1 means the ID was not found)
    if (indexToDelete !== -1) {
      // Remove the object at the found index from local storage
      allTodosLocal.splice(indexToDelete, 1);

      // Update the local storage with the new modified array
      localStorage.setItem("todos", JSON.stringify(allTodosLocal));
    }
  };

  //useEffect hook trigger when value of isCompleted state variable hook changes
  // and then trigger the store dispatcher function to update the correosponding object with updated state
  useEffect(() => {
    dispatch(updateTodo(isCompleted));
  }, [isCompleted, dispatch]);

  return (
    <div>
      <Grid item xs={12} md={6}>
        <Typography
          className={styles.listHeading}
          sx={{
            mt: 4,
            mb: 1,
            display: "flex",
            color: "#6A0DAD",
            fontWeight: 600,
          }}
          variant="h4"
          component="div"
        >
          Todo List :
        </Typography>
        <List>
          {todos.map((todo) => {
            return (
              <ListItem
                key={todo.id}
                secondaryAction={
                  <IconButton
                    onClick={() => {
                      dispatch(removoTodo(todo.id));
                      deleteTodoFromLocal(todo.id);
                    }}
                    edge="end"
                    aria-label="delete"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      "@media (max-width: 600px)": {
                        "& .MuiSvgIcon-root": {
                          fontSize: 24, // Adjusted icon size for smaller screens (e.g., mobile devices)
                        },
                      },
                    }}
                  >
                    <DeleteIcon fontSize="large" />
                  </IconButton>
                }
                className={styles.listMaterial}
                sx={{
                  width: 1000,
                  height: 80,
                  borderRadius: 1,
                  fontSize: 50,
                  marginTop: 1,
                  bgcolor: todo.completed ? "#008000" : "#800080",
                  transition: "background-color 0.3s ease-in-out",
                  "@media (max-width: 600px)": {
                    // Media query for mobile devices
                    height: 50, // Adjusted height for smaller screens
                    fontSize: 10, // Adjusted font size for smaller screens
                    width: 300,
                  },
                  "&:hover": {
                    bgcolor: todo.completed ? "" : "#ffd700",
                  },
                }}
              >
                <ListItemAvatar
                  sx={{
                    fontSize: "20px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {todo.completed ? (
                    <CheckCircleIcon color="primary" fontSize="large" />
                  ) : (
                    <Checkbox
                      size="large"
                      edge="start"
                      tabIndex={-1}
                      onChange={handleCheckboxChange(todo.id)}
                      disableRipple
                      icon={<CheckBoxOutlineWhiteIcon />}
                      sx={{
                        "@media (max-width: 600px)": {
                          "& .MuiSvgIcon-root": {
                            fontSize: 20, // Adjusted icon size for smaller screens (e.g., mobile devices)
                          },
                        },
                      }}
                    />
                  )}
                </ListItemAvatar>
                <ListItemText>
                  <Typography
                    variant="h2"
                    sx={{
                      marginLeft: "3px",
                      fontSize: "30px",
                      fontWeight: 500,
                      color: "#FFFFFF",
                      "@media (max-width: 600px)": {
                        fontSize: "15px", // Adjusted font size for smaller screens (e.g., mobile devices)
                      },
                    }}
                  >
                    {todo.text}
                  </Typography>
                </ListItemText>
              </ListItem>
            );
          })}
        </List>
      </Grid>
    </div>
  );
}

export default TaskList;
