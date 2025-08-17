import { useState, useEffect } from 'react';
import styles from './Calculator.module.css';

export default function Calculator() {
  const [display, setDisplay] = useState('0');
  const [history, setHistory] = useState([]);
  const [activeButton, setActiveButton] = useState(null);
  const [isScientific, setIsScientific] = useState(false);
  const [radians, setRadians] = useState(true);

  // Load history from localStorage
  useEffect(() => {
    const savedHistory = localStorage.getItem('calcHistory');
    if (savedHistory) setHistory(JSON.parse(savedHistory));
  }, []);

  // Save history to localStorage
  useEffect(() => {
    localStorage.setItem('calcHistory', JSON.stringify(history));
  }, [history]);

  const handleButtonClick = (value) => {
    if (display === 'Error') setDisplay('0');
    
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
      const expression = display.replace(/×/g, '*').replace(/÷/g, '/');
      const result = eval(expression).toString();
      
      const formattedResult = result.length > 10 ? 
        parseFloat(result).toExponential(6) : 
        result;
      
      setHistory([...history, `${display} = ${formattedResult}`]);
      setDisplay(formattedResult);
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

  const handleScientific = (func) => {
    try {
      const num = parseFloat(display);
      let result;
      
      switch(func) {
        case 'sqrt': result = Math.sqrt(num); break;
        case 'square': result = Math.pow(num, 2); break;
        case 'pow': result = Math.pow(num, 3); break;
        case 'sin': result = radians ? Math.sin(num) : Math.sin(num * Math.PI / 180); break;
        case 'cos': result = radians ? Math.cos(num) : Math.cos(num * Math.PI / 180); break;
        case 'tan': result = radians ? Math.tan(num) : Math.tan(num * Math.PI / 180); break;
        case 'log': result = Math.log10(num); break;
        case 'ln': result = Math.log(num); break;
        case 'pi': result = Math.PI; break;
        case 'e': result = Math.E; break;
        case 'fact': 
          result = Array.from({length: num}, (_, i) => i + 1)
                   .reduce((fact, val) => fact * val, 1);
          break;
        default: return;
      }
      
      setDisplay(result.toString());
    } catch {
      setDisplay('Error');
      setTimeout(() => setDisplay('0'), 1000);
    }
  };

  const handlePercentage = () => {
    try {
      setDisplay((parseFloat(display) / 100).toString());
    } catch {
      setDisplay('Error');
    }
  };

  const getButtonClass = (value, specialClass = '') => {
    return `${styles.button} ${specialClass ? styles[specialClass] : ''} ${
      activeButton === value ? styles.active : ''
    }`;
  };

  return (
    <div className={styles.calculatorContainer}>
      <div className={styles.calculator}>
        <div className={styles.calculatorHeader}>
          <h1 className={styles.header}>Calculator</h1>
          <button 
            onClick={() => setIsScientific(!isScientific)}
            className={styles.scientific}
          >
            {isScientific ? 'Standard' : 'Scientific'}
          </button>
        </div>
        
        <div className={styles.displayContainer}>
          <input
            type="text"
            value={display}
            disabled
            className={styles.display}
            aria-label="Calculator display"
          />
          <div className={styles.displaySubtext}>
            {history.length > 0 ? history[history.length - 1].split('=')[1].trim() : ''}
          </div>
        </div>
        
        {isScientific && (
          <div className={styles.scientificPanel}>
            <div className={styles.scientificRow}>
              <button onClick={() => handleScientific('sqrt')} className={getButtonClass('sqrt', 'scientific')}>
                √
              </button>
              <button onClick={() => handleScientific('square')} className={getButtonClass('square', 'scientific')}>
                x²
              </button>
              <button onClick={() => handleScientific('pow')} className={getButtonClass('pow', 'scientific')}>
                x³
              </button>
              <button onClick={() => handleScientific('sin')} className={getButtonClass('sin', 'scientific')}>
                sin
              </button>
              <button onClick={() => handleScientific('cos')} className={getButtonClass('cos', 'scientific')}>
                cos
              </button>
            </div>
            <div className={styles.scientificRow}>
              <button onClick={() => handleScientific('tan')} className={getButtonClass('tan', 'scientific')}>
                tan
              </button>
              <button onClick={() => handleScientific('log')} className={getButtonClass('log', 'scientific')}>
                log
              </button>
              <button onClick={() => handleScientific('ln')} className={getButtonClass('ln', 'scientific')}>
                ln
              </button>
              <button onClick={() => handleScientific('pi')} className={getButtonClass('pi', 'scientific')}>
                π
              </button>
              <button onClick={() => handleScientific('e')} className={getButtonClass('e', 'scientific')}>
                e
              </button>
            </div>
            <div className={styles.angleToggle}>
              <button 
                onClick={() => setRadians(!radians)}
                className={radians ? styles.activeToggle : ''}
              >
                {radians ? 'RAD' : 'DEG'}
              </button>
            </div>
          </div>
        )}

        <div className={styles.buttons}>
          <button onClick={clearDisplay} className={getButtonClass('C', 'functionButton')}>
            AC
          </button>
          <button onClick={deleteLast} className={getButtonClass('DEL', 'functionButton')}>
            DEL
          </button>
          <button onClick={handlePercentage} className={getButtonClass('%', 'functionButton')}>
            %
          </button>
          <button 
            onClick={() => handleButtonClick('/')} 
            className={getButtonClass('/', 'operator')}
          >
            ÷
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
            onClick={() => handleButtonClick('*')} 
            className={getButtonClass('*', 'operator')}
          >
            ×
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
            onClick={() => handleButtonClick('-')} 
            className={getButtonClass('-', 'operator')}
          >
            −
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
            onClick={() => handleButtonClick('+')} 
            className={getButtonClass('+', 'operator')}
          >
            +
          </button>

          <button 
            onClick={() => handleButtonClick('0')} 
            className={getButtonClass('0', 'zero')}
          >
            0
          </button>
          <button 
            onClick={() => handleButtonClick('.')} 
            className={getButtonClass('.', 'decimal')}
          >
            .
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
          <div className={styles.historyHeader}>
            <h3>Calculation History</h3>
            <button 
              onClick={() => setHistory([])} 
              className={styles.clearHistoryButton}
            >
              Clear
            </button>
          </div>
          <ul className={styles.historyList}>
            {history.slice().reverse().map((item, index) => (
              <li key={index} className={styles.historyItem}>
                <span className={styles.historyExpression}>{item.split('=')[0]}</span>
                <span className={styles.historyResult}>= {item.split('=')[1]}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}