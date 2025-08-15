import styles from './Calculator.module.css';

export default function Calculator() {
  return (
    <div className={styles.calculator}>
      <input 
        type="text" 
        className={styles.display} 
        value="0" 
        disabled 
      />
      <div className={styles.buttons}>
        {['7','8','9','/','4','5','6','*','1','2','3','-','0','.','=','+'].map((btn) => (
          <button key={btn} className={styles.button}>
            {btn}
          </button>
        ))}
      </div>
    </div>
  );
}