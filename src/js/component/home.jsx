import React, { useContext, useEffect, useState } from "react";
import TaskContext from "./TaskContext";

const ToDoList = () => {
  const { tasks, taskActions } = useContext(TaskContext);
  const [newTask, setNewTask] = useState("");

  const handleAddTask = (e) => {
    e.preventDefault();
    if (newTask.trim()) {
      taskActions({ type: "add", payload: newTask });
      setNewTask("");
    }
  };

  const handleRemoveTask = (index) => {
    taskActions({ type: "remove", index });
  };

  useEffect(() => {
    // Fetch tasks from API (this would go here if needed)
  }, []);

  return (
    <div className="todo-list">
      <h2>Todo List</h2>
      <form onSubmit={handleAddTask}>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add new task"
        />
        <button type="submit">Add Task</button>
      </form>
      <ul>
        {tasks.length === 0 ? (
          <li>No tasks available</li>
        ) : (
          tasks.map((task, index) => (
            <li key={index}>
              {task}
              <button onClick={() => handleRemoveTask(index)}>Remove</button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default ToDoList;