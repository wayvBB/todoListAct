import { useState, useEffect } from 'react';
import './App.css';
import TodoList from "./TodoList";

function App() {
  const [theme, setTheme] = useState("light");
  
  // Load saved theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
      document.body.classList.add(savedTheme); // Apply the saved theme to the body
    } else {
      document.body.classList.add("light"); // Default to light mode
    }
  }, []);
  
  // Toggle the theme
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.body.classList.remove(theme); // Remove current theme class
    document.body.classList.add(newTheme); // Apply new theme class
    localStorage.setItem("theme", newTheme); // Save the selected theme
  };
  
  return (
    <div className="outer">
      {/* Dark Mode Toggle Button - placed outside the todo list */}
      <button className="theme-toggle" onClick={toggleTheme}>
        {theme === "light" ? "🌙 Dark Mode" : "🔆 Light Mode"}
      </button>
      
      <div className="title-container">
        <h1 id="title">Isa's TODO App</h1>
        <TodoList />
      </div>
    </div>
  );
}

export default App;