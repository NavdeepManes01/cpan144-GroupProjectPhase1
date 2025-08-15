import styles from './Weather.module.css';

export default function Weather() {
  return (
    <div className={styles.container}>
      <h1>Weather Broadcast</h1>
      <form className={styles.form}>
        <input
          type="text"
          placeholder="Enter city name"
          className={styles.input}
        />
        <button type="submit" className={styles.button}>
          Get Weather
        </button>
      </form>
      <div className={styles.weatherResult}>
        <h2>Weather in Toronto, Canada</h2>
        <p><strong>Condition:</strong> Sunny</p>
        <p><strong>Temperature:</strong> 22°C</p>
        <p><strong>Humidity:</strong> 50%</p>
      </div>
    </div>
  );
}