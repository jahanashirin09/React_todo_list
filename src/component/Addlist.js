import React, { useState } from 'react'
import './Addlist.css'
export default function Addlist() {
    const[tasks,setTask]=useState([]);
    const[newTask,setNewTask]=useState("");
    const[style,setStyle]=useState([]);


    function handleTaskChange(event){
        setNewTask(event.target.value)}

    function addTask(){
      if(newTask.trim()!==""){
        setTask(t=>[...t,newTask])
      setNewTask("")}}
    function deleteTask(taskId){
       setTask(
          tasks.filter((value,index)=>{
            return index !== taskId;}))}
    function moveUp(index){
          if(index>0){
            const updatedTask=[...tasks];
            [updatedTask[index],updatedTask[index-1]]=[updatedTask[index-1],updatedTask[index]]
            setTask(updatedTask)}}
    function moveDown(index){
          if(index<tasks.length-1){
            const updatedTask=[...tasks];
            [updatedTask[index],updatedTask[index+1]]=[updatedTask[index+1],updatedTask[index]]
            setTask(updatedTask)}}
    function completed(index){
      if(style.indexOf(index)=== -1)
        setStyle([...style,index])
     
     console.log(style);
    }
  return (
    <div>
        <div className='addlist-container'>
        <input className='input-task'
        type='text'
        placeholder='Task'
        value={newTask}
        onChange={handleTaskChange}
        />
        
        <button className='Add-task'
        onClick={addTask}>
            Add Task

        </button>

        </div>
        <div className='overViewContainer'>
       <ol>
        {tasks.map((task,index)=>
            <li key={index} className={style.indexOf(index)!== -1?'list-item-green':'list-item'}>
              <div className='text-container'>
                <span className='text-task'>{task}</span>
               
                </div>
                <div className='list-btn'>
                <button className='delete-btn' onClick={()=>deleteTask(index)}>Delete</button>
                <button className='move-up' onClick={()=>moveUp(index)}>⬆️</button>
                <button className='move-down' onClick={()=>moveDown(index)}>⬇️</button>
                <button className='completed' onClick={()=>completed(index)}>✅</button>
                </div>

            </li>
        )}
       </ol>
    </div>
    </div>
  )
}
