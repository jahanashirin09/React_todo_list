import React from 'react'
import './ListComponent.css'

export default function ListComponent({tasks,handledelete,handleEdit,handleComplete}) {
  return (
    <div>
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
    </div>
  )
}
