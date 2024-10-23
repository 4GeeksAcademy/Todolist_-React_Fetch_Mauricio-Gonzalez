import React from "react";
import ReactDOM from "react-dom/client";
import ToDoList from "./component/home.jsx";
import { TaskProvider } from "./component/TaskContext";
import "../styles/index.css";

const rootElement = document.getElementById("app");

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <TaskProvider>
      <ToDoList />
    </TaskProvider>
  );
} else {
  console.error("No DOM element with id 'app' found.");
}