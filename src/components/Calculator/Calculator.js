import { useState } from 'react';
import styles from './Calculator.module.css';

export default function Calculator() {
  const [display, setDisplay] = useState('0');
  const [history, setHistory] = useState([]);
  const [activeButton, setActiveButton] = useState(null);

  const handleButtonClick = (value) => {
    if (display === '0' && value !== '.') {
      setDisplay(value);
    } else {
      setDisplay(display + value);
    }
    setActiveButton(value);
    setTimeout(() => setActiveButton(null), 150);
  };

  const calculate = () => {
    try {
      const result = eval(display).toString();
      setHistory([...history, `${display} = ${result}`.slice(0, 20)]);
      setDisplay(result);
    } catch {
      setDisplay('Error');
      setTimeout(() => setDisplay('0'), 1000);
    }
  };

  const clearDisplay = () => {
    setDisplay('0');
  };

  const deleteLast = () => {
    setDisplay(display.length > 1 ? display.slice(0, -1) : '0');
  };

  const getButtonClass = (value, specialClass = '') => {
    return `${styles.button} ${specialClass ? styles[specialClass] : ''} ${
      activeButton === value ? styles.active : ''
    }`;
  };

  return (
    <div className={styles.calculatorContainer}>
      <div className={styles.calculator}>
        <h1 className={styles.header}>Calculator</h1>
        <div className={styles.displayContainer}>
          <input
            type="text"
            value={display}
            disabled
            className={styles.display}
            aria-label="Calculator display"
          />
        </div>
        
        <div className={styles.buttons}>
          {/* First row */}
          <button onClick={clearDisplay} className={getButtonClass('C', 'functionButton')}>
            AC
          </button>

          <button onClick={deleteLast} className={getButtonClass('DEL', 'functionButton')}>
            DEL
          </button>

          <button 
            onClick={() => handleButtonClick('/')} 
            className={getButtonClass('/', 'operator')}
          >
            ÷
          </button>

          <button 
            onClick={() => handleButtonClick('*')} 
            className={getButtonClass('*', 'operator')}
          >
            ×
          </button>

          
          
          
          
          <button onClick={() => handleButtonClick('7')} className={getButtonClass('7')}>
            7
          </button>
          <button onClick={() => handleButtonClick('8')} className={getButtonClass('8')}>
            8
          </button>
          <button onClick={() => handleButtonClick('9')} className={getButtonClass('9')}>
            9
          </button>
          
          <button 
            onClick={() => handleButtonClick('-')} 
            className={getButtonClass('-', 'operator')}
          >
            −
          </button>

          <button onClick={() => handleButtonClick('4')} className={getButtonClass('4')}>
            4
          </button>
          <button onClick={() => handleButtonClick('5')} className={getButtonClass('5')}>
            5
          </button>
          <button onClick={() => handleButtonClick('6')} className={getButtonClass('6')}>
            6
          </button>
          
          <button 
            onClick={() => handleButtonClick('+')} 
            className={getButtonClass('+', 'operator')}
          >
            +
          </button>

          <button onClick={() => handleButtonClick('1')} className={getButtonClass('1')}>
            1
          </button>
          <button onClick={() => handleButtonClick('2')} className={getButtonClass('2')}>
            2
          </button>
          <button onClick={() => handleButtonClick('3')} className={getButtonClass('3')}>
            3
          </button>
          
          <button 
            onClick={() => handleButtonClick('.')} 
            className={getButtonClass('.', 'decimal')}
          >
            .
          </button>
          
          <button 
            onClick={() => handleButtonClick('0')} 
            className={getButtonClass('0', 'zero')}
          >
            0
          </button>
          
          <button
            onClick={calculate} 
            className={getButtonClass('=', 'equals')}
          >
            =
          </button>
        </div>
      </div>
      
      {history.length > 0 && (
        <div className={styles.historyPanel}>
          <h3>Calculation History</h3>
          <ul className={styles.historyList}>
            {history.slice().reverse().map((item, index) => (
              <li key={index} className={styles.historyItem}>
                {item}
              </li>
            ))}
          </ul>
          {history.length > 0 && (
            <button 
              onClick={() => setHistory([])} 
              className={styles.clearHistoryButton}
            >
              Clear History
            </button>
          )}
        </div>
      )}
    </div>
  );
}