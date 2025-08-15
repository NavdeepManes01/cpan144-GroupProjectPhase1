import styles from './ListManager.module.css';

export default function ListManager() {
  return (
    <div className={styles.container}>
      <h1>List Manager</h1>
      <div className={styles.inputSection}>
        <input 
          type="text" 
          placeholder="Enter a task..." 
          className={styles.input}
        />
        <input 
          type="datetime-local" 
          className={styles.dateInput}
        />
        <button className={styles.button}>Add Task</button>
      </div>
      <ul className={styles.taskList}>
        <li className={styles.taskItem}>
          Example Task (Due: 2023-12-01)
          <button className={styles.deleteButton}>Delete</button>
        </li>
      </ul>
    </div>
  );
}