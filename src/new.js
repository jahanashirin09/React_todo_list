import React, { useState } from 'react';
import './Addlist.css';

export default function Addlist() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");
    const [completedTasks, setCompletedTasks] = useState([]);

    const handleTaskChange = (event) => {
        setNewTask(event.target.value);
    };

    const addTask = () => {
        if (newTask.trim() !== "") {
            setTasks((prev) => [...prev, newTask]);
            setCompletedTasks((prev) => [...prev, false]); // Initialize completion state
            setNewTask("");
        }
    };

    const deleteTask = (taskId) => {
        setTasks((prev) => prev.filter((_, index) => index !== taskId));
        setCompletedTasks((prev) => prev.filter((_, index) => index !== taskId)); // Sync completion state
    };

    const moveUp = (index) => {
        if (index > 0) {
            const updatedTasks = [...tasks];
            const updatedCompletedTasks = [...completedTasks];
            [updatedTasks[index], updatedTasks[index - 1]] = [updatedTasks[index - 1], updatedTasks[index]];
            [updatedCompletedTasks[index], updatedCompletedTasks[index - 1]] = [updatedCompletedTasks[index - 1], updatedCompletedTasks[index]]; // Move completed status
            setTasks(updatedTasks);
            setCompletedTasks(updatedCompletedTasks);
        }
    };

    const moveDown = (index) => {
        if (index < tasks.length - 1) {
            const updatedTasks = [...tasks];
            const updatedCompletedTasks = [...completedTasks];
            [updatedTasks[index], updatedTasks[index + 1]] = [updatedTasks[index + 1], updatedTasks[index]];
            [updatedCompletedTasks[index], updatedCompletedTasks[index + 1]] = [updatedCompletedTasks[index + 1], updatedCompletedTasks[index]]; // Move completed status
            setTasks(updatedTasks);
            setCompletedTasks(updatedCompletedTasks);
        }
    };

    const completed = (index) => {
        setCompletedTasks((prev) => {
            const updatedCompletedTasks = [...prev];
            updatedCompletedTasks[index] = !updatedCompletedTasks[index]; 
            return updatedCompletedTasks;
        });
    };

    return (
        <div>
            <div className='addlist-container'>
                <input
                    className='input-task'
                    type='text'
                    placeholder='Task'
                    value={newTask}
                    onChange={handleTaskChange}
                />
                <button className='Add-task' onClick={addTask}>
                    Add Task
                </button>
            </div>
            <div className='overViewContainer'>
                <ol>
                    {tasks.map((task, index) => (
                        <li
                            key={index}
                            className={completedTasks[index] ? 'list-item-green' : 'list-item'}
                        >
                            <div className='text-container'>
                                <span className='text-task'>{task}</span>
                            </div>
                            <div className='list-btn'>
                                <button className='delete-btn' onClick={() => deleteTask(index)}>Delete</button>
                                <button className='move-up' onClick={() => moveUp(index)}>⬆️</button>
                                <button className='move-down' onClick={() => moveDown(index)}>⬇️</button>
                                <button className='completed' onClick={() => completed(index)}>✅</button>
                            </div>
                        </li>
                    ))}
                </ol>
            </div>
        </div>
    );
}
