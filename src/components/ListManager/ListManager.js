import { useState, useEffect } from 'react';
import styles from './ListManager.module.css';

export default function ListManager() {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');
  const [dueDate, setDueDate] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('tasks');
    if (saved) setTasks(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (!taskInput.trim() || !dueDate) return;
    
    const newTask = {
      id: Date.now(),
      text: taskInput,
      dueDate: new Date(dueDate).toLocaleString(),
      completed: false
    };

    setTasks([...tasks, newTask]);
    setTaskInput('');
    setDueDate('');
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const toggleComplete = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  
  return (
    <div className={styles.container}>
      <h1>List Manager</h1>
      <div className={styles.inputGroup}>
        <input
          type="text"
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
          placeholder="Enter task..."
          className={styles.input}
        />
        <input
          type="datetime-local"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className={styles.dateInput}
        />
        <button onClick={addTask} className={styles.addButton}>
          Add Task
        </button>
      </div>
      
      <ul className={styles.taskList}>
        {tasks.map(task => (
          <li key={task.id} className={`${styles.taskItem} ${task.completed ? styles.completed : ''}`}>
            <span onClick={() => toggleComplete(task.id)}>
              {task.text} (Due: {task.dueDate})
            </span>
            <button 
              onClick={() => deleteTask(task.id)} 
              className={styles.deleteButton}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}