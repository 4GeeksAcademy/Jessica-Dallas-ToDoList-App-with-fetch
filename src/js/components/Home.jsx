import React, { useState } from 'react';

const Home = () => {
  const [task, setTask] = useState("");
  const [taskList, setTaskList] = useState([]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && task.trim() !== "") {
      setTaskList([...taskList, task.trim()]);
      setTask("");
    }
  };

  const removeTask = (index) => {
    const newList = taskList.filter((_, i) => i !== index);
    setTaskList(newList);
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center text-muted">To-Do List</h1>
      <div className="card mx-auto shadow-sm" style={{ maxWidth: "500px" }}>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <input
              type="text"
              className="form-control border-0 shadow-none"
              placeholder="What needs to be done?"
              value={task}
              onChange={(e) => setTask(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </li>
          {taskList.map((item, index) => (
            <li
              key={index}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              {item}
              <button
                className="btn btn-sm btn-outline-danger"
                onClick={() => removeTask(index)}
              >
                ✕
              </button>
            </li>
          ))}
          <li className="list-group-item text-muted">
            {taskList.length === 0
              ? "No tasks, add a task"
              : `${taskList.length} item${taskList.length > 1 ? "s" : ""} left`}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Home;
