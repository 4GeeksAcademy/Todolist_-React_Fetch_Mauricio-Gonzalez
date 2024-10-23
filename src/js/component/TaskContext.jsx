import React, { useReducer, createContext } from "react";

const TaskContext = createContext(null);

const TaskReducer = (state, action) => {
  switch (action.type) {
    case "add":
      return [...state, action.payload];
    case "remove":
      return state.filter((_, index) => index !== action.index);
    default:
      return state;
  }
};

export function TaskProvider({ children }) {
  const [tasks, taskActions] = useReducer(TaskReducer, []);

  return (
    <TaskContext.Provider value={{ tasks, taskActions }}>
      {children}
    </TaskContext.Provider>
  );
}

export default TaskContext;