import React,{ useEffect, useState } from "react";
import "./Addlist.css";
import { v4 as uuidv4 } from "uuid";
import { useLocation} from "react-router-dom";
import ListComponent from "./ListComponent";
import Logout from "./Logout";

export default function Addlist() {
  // const initialState = JSON.parse(localStorage.setItem("tasks",)) ||[];
  const [tasks, setTask] = useState([])
  const [newTask, setNewTask] = useState("");
  const [editTask, SetEditTask] = useState(null);
  // useEffect(() => {
  //   localStorage.getItem("tasks", JSON.stringify(tasks));
  // }, [tasks]);
  const location=useLocation();
  const data=location.state
  console.log(data,"addlist");
  const updateTask = (title, id, completed) => {
    const newwTask = tasks.map((task) =>
      task.id === id ? { title, id, completed } : task);
    setTask(newwTask);
    SetEditTask(null);};
  useEffect(() => {
    if (editTask) {
      setNewTask(editTask.title);
    } else {
      setNewTask("");
    }
  }, [setNewTask, editTask]);
  const onInputChange = (event) => {
    setNewTask(event.target.value);
  };
  const onFormSubmit = (event) => {
    event.preventDefault();
    if (!editTask) {
      setTask([...tasks, { id: uuidv4(), title: newTask, completed: false }]);
      setNewTask("");
    } else {
      updateTask(newTask, editTask.id, editTask.completed);}};
  const handledelete = ({ id }) => {
    setTask(tasks.filter((task) => task.id !== id));};
  const handleComplete = (task) => {
    setTask(
      tasks.map((item) => {
        console.log(item.id);
        if (item.id === task.id) {
          return { ...item, completed: !item.completed };}
        return item;}));};
  const handleEdit = ({ id }) => {
    const findTodo = tasks.find((task) => task.id === id);
    SetEditTask(findTodo);};
  return (
    <div>
      <form onSubmit={onFormSubmit}>
        <div className="addlist-container">
          <Logout/>
          <input
            className="input-task"
            type="text"
            placeholder="Enter a Todo..."
            value={newTask}
            required
            onChange={onInputChange}/>
          <button className={`Add-task${newTask?"":"disabled"} `} disabled={!newTask} >{editTask ? "Ok" : "add task"}</button>
        </div>
         <ListComponent
         tasks={tasks}
         handledelete={handledelete}
         handleEdit={handleEdit}
         handleComplete={handleComplete}
         />
      </form>
    </div>
  );
}
