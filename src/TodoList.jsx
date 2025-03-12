import { useState, useEffect } from "react";
import "./index.css";

export default function TodoList() {
  const [taskList, setTaskList] = useState([]);
  const [currentTask, setCurrentTask] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [filter, setFilter] = useState("all");

  const addTask = () => {
    if (currentTask.trim() === "") return;

    if (editIndex !== null) {
      const updatedTasks = [...taskList];
      updatedTasks[editIndex] = currentTask;
      setTaskList(updatedTasks);
      setEditIndex(null);
    } else {
      setTaskList([...taskList, currentTask]);
    }

    setCurrentTask("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      addTask();
    }
  };

  const editTask = (index) => {
    setEditIndex(index);
    setCurrentTask(taskList[index]);
  };

  const deleteTask = (index) => {
    const updatedTasks = [...taskList];
    updatedTasks.splice(index, 1);
    setTaskList(updatedTasks);
    
    // Update completedTasks indexes after deletion
    setCompletedTasks(
      completedTasks
        .filter(i => i !== index)
        .map(i => (i > index ? i - 1 : i))
    );
    
    // Reset edit state if deleting the task being edited
    if (editIndex === index) {
      setEditIndex(null);
      setCurrentTask("");
    } else if (editIndex !== null && editIndex > index) {
      // Adjust editIndex if needed
      setEditIndex(editIndex - 1);
    }
  };

  const toggleComplete = (index) => {
    if (completedTasks.includes(index)) {
      setCompletedTasks(completedTasks.filter((i) => i !== index));
    } else {
      setCompletedTasks([...completedTasks, index]);
    }
  };

  // Create a mapping of which tasks are filtered
  const filteredTasksMap = taskList.map((task, index) => {
    if (filter === "completed") {
      return completedTasks.includes(index);
    } else if (filter === "pending") {
      return !completedTasks.includes(index);
    }
    return true; // for "all" filter
  });

  // Get the filtered tasks and their original indices
  const filteredTasksWithIndices = taskList
    .map((task, index) => ({ task, originalIndex: index }))
    .filter((item, index) => filteredTasksMap[index]);

  return (
    <div className="todo-list">
      <h2>To-Do List</h2>
      <div className="input-container">
        <input
          type="text"
          placeholder="Add a new task..."
          value={currentTask}
          onChange={(e) => setCurrentTask(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <button className="add-task-btn" onClick={addTask}>
          {editIndex !== null ? "Update Task" : "Add Task"}
        </button>
      </div>

      {/* Filter buttons */}
      <div className="filters">
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("completed")}>Completed</button>
        <button onClick={() => setFilter("pending")}>Pending</button>
      </div>

      <ul>
        {filteredTasksWithIndices.map(({ task, originalIndex }, index) => (
          <li key={originalIndex}>
            <div className="task-content">
              <input
                type="checkbox"
                checked={completedTasks.includes(originalIndex)}
                onChange={() => toggleComplete(originalIndex)}
              />
              <span className={completedTasks.includes(originalIndex) ? "completed" : ""}>
                {task}
              </span>
            </div>
            <div className="task-buttons">
              <button className="edit-btn" onClick={() => editTask(originalIndex)}>
                Edit
              </button>
              <button className="delete-btn" onClick={() => deleteTask(originalIndex)}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      {taskList.length > 2 && (
        <button className="clear-btn" onClick={() => setTaskList([])}>
          Clear All
        </button>
      )}
    </div>
  );
}
