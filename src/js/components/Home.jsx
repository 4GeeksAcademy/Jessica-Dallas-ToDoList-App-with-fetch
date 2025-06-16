import React, { useState, useEffect } from "react";

//create your first component
const TodoList = () => {
  const [todos, setTodos] = useState([
    { label: "Work On Pending Projects", done: false },
    { label: "Work On Pending Orders", done: false },
    { label: "Ship Out Orders", done: false },
    { label: "Wash Clothes", done: false },
  ]);
  const [newTodo, setNewTodo] = useState("");
const API_URL = "https://playground.4geeks.com/todo/users/Jessica-Dallas";


  useEffect(() => {
    const UserExists = async () => {
      let response = await fetch("https://playground.4geeks.com/todo/users/Jessica-Dallas");
      let data = await response.json();


      if (data.slug !== "Jessica_Dallas") {

        await fetch("https://playground.4geeks.com/todo/users/Jessica-Dallas", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify([]),
        });
        console.log("User created: Jessica_Dallas");
      }


      fetchTodos();
    };

    const fetchTodos = async () => {
      let response = await fetch(API_URL);
      let data = await response.json();
      console.log("Fetched data:", data);

      if (Array.isArray(data)) {
        setTodos(data);
      }
    };

    UserExists();
  }, []);

  const addTodo = async (e) => {
    e.preventDefault();
    if (newTodo.trim() !== "") {
      let updatedTodos = [...todos, { label: newTodo, done: false }];
      setTodos(updatedTodos);
      setNewTodo("");

      await fetch("https://playground.4geeks.com/todo/todos/214", {
        method: "PUT",
        body: JSON.stringify(updatedTodos),
        headers: { "Content-Type": "application/json" },
      });
    }
  };

  const removeTodo = async (index) => {
    let updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);

    await fetch("https://playground.4geeks.com/todo/todos/214", {
      method: "PUT",
      body: JSON.stringify(updatedTodos),
      headers: { "Content-Type": "application/json" },
    });
  };

  const clearTodos = async () => {
    setTodos([]);
    await fetch("https://playground.4geeks.com/todo/users/Jessica_Dallas", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
  };

  return (
    <div className="todo-container">
      <h1 className="todo-title">To-Dos</h1>
      <form onSubmit={addTodo}>
        <input
          type="text"
          placeholder="What needs to be done?"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          className="todo-input"
        />
      </form>

      <ul className="todo-list">
        {todos.map((todo, index) => (
          <li key={index} className="todo-item">
            {todo.label}
            <button onClick={() => removeTodo(index)} className="delete-button">
              ✖
            </button>
          </li>
        ))}
      </ul>
      <div className="todo-footer">
        {todos.length} {todos.length === 1 ? "item" : "items"} left
      </div>
    </div>
  );
};

export default TodoList;