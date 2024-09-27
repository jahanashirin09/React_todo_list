import React,{ useEffect, useState } from "react";
import "./Addlist.css";
import { v4 as uuidv4 } from "uuid";
import { useLocation, useNavigate } from "react-router-dom";

export default function Addlist() {
  // const initialState = JSON.parse(localStorage.setItem("tasks")) ||[];
  const [tasks, setTask] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editTask, SetEditTask] = useState(null);
  const navigate=useNavigate()
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
  const handleLogout=()=>{
     localStorage.removeItem(`${data.email}`)
     localStorage.removeItem("LoginStatus")
     navigate('/')
     //localStorage.getItem(`${data.email}`)
    console.log(data);}
  return (
    <div>
      <form onSubmit={onFormSubmit}>
        <div className="addlist-container">
          <div className="logout-btn-container">
          <button className="logout-btn" onClick={handleLogout} loading>Logout
          </button>
          </div>
          <input
            className="input-task"
            type="text"
            placeholder="Enter a Todo..."
            value={newTask}
            required
            onChange={onInputChange}/>
          <button className={`Add-task${newTask?"":"disabled"} `} disabled={!newTask} >{editTask ? "Ok" : "add task"}</button>
        </div>
       
          {tasks.map((task) => (
             <div className="overViewContainer">
            <li className="list-item" key={task.id}>
              <input
                type="text"
                value={task.title}
                className={`text-task${task.completed ? "completed" : ""}`}
                onChange={(event) => event.preventDefault()}
              ></input>
              <div className="list-btn">
                <button
                  className="delete-btn"
                  onClick={() => handledelete(task)}>
                  Delete
                </button>
                <button
                  className="move-up"
                  onClick={() => handleComplete(task)}>
                  <i class="fa-solid fa-circle-check"></i>
                </button>
                <button className="move-down" onClick={() => handleEdit(task)} >
                <i class="fa-solid fa-pen-to-square"></i>
                </button>
              </div>
            </li>
            </div>
          ))}
        
      </form>
    </div>
  );
}
