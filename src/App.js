/*import './App.css';
import {useState, useRef, useEffect} from 'react';

// "https://cdn.freecodecamp.org/testable-projects-fcc/audio/BeepSound.wav"

function App() {
  const [timeLeft, setTimeLeft] = useState(1500); //in seconds!
  const [sessionLength, setSessionLength] = useState(1500);
  const [breakLength, setBreakLength] = useState(300);
  const [timerId, setTimerId] = useState('session');
  const [timerRunning, setTimerRunning] = useState(false);

  //set up audio
  let beep = document.getElementById('beep');
  function playBeep () {
    beep.play();
  };
  function resetBeep () {
    beep.pause();
    beep.currentTime = 0;
  }
  
  //auto run timer, when timerRunning true
  useEffect(() => {
    let interval = null;
    if (timerRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      timerEnded(timerId);
    }
    return () => clearInterval(interval); // Clean up on unmount or if timerRunning changes
  }, [timerRunning, timeLeft]);

  function resetToDefault() {
    //stop running timer
    setTimerRunning(false);
    
    //stop beep, reset its time to 0
    resetBeep();
    //set break and session to 5, 25 
    setSessionLength(1500);
    setBreakLength(300);
    //reset display
    setTimerId('session');
    setTimeLeft(1500);
    
  };

  function breakIncrement() {
    //stop running timer
    setTimerRunning(false);
    //increase break ++
    //not greater then 60
    if(breakLength<3600){
      setBreakLength(breakLength + 60);
      if(timerId==='break'){
        setTimeLeft(breakLength + 60);
      }
    };
    
  };

  function breakDecrement() {
    //stop running timer
    setTimerRunning(false);
    //breakLength --
    //not smaller then 0
    if(breakLength>60){
      setBreakLength(breakLength - 60);
      if(timerId==='break'){
        setTimeLeft(breakLength - 60);
      };
    };
    
  };

  function sessionIncrement() {
    //stop running timer
    setTimerRunning(false);
    //session ++
    //not greater then 60
    if(sessionLength<3600){
      setSessionLength(sessionLength + 60);
      if(timerId==='session'){
        setTimeLeft(sessionLength + 60);
      }; 
    }
    
  };

  function sessionDecrement() {
    //stop running timer
    setTimerRunning(false);
    //session --
    //not smaller then 0
    if(sessionLength>60){
      setSessionLength(sessionLength - 60);
      if(timerId === 'session'){
        setTimeLeft(sessionLength - 60);
      };
    }
    
  };

  function toggleRunningTimer () {
    if(timerRunning){
      setTimerRunning(false);
    } else {
      setTimerRunning(true);
    }
  };

  function timerEnded (priorTimerId) {
    //play sound
    playBeep();
    //toggle to break/session time
    //update timer-label
    if(priorTimerId === 'break'){
      setTimerId('session');
      setTimeLeft(sessionLength);
    } else {
      setTimerId('break');
      setTimeLeft(breakLength);
    }
    //start timer of next break/session
    setTimerRunning(true);
  };

  return (
    <div className="App">
      <h1>Welcome to Break-Timer</h1>
      <div id = "break-label">BreakLength</div>
      <div id = "break-length">{breakLength / 60}</div>
      <button id = "break-increment" onClick = {breakIncrement}>+</button>
      <button id = "break-decrement" onClick = {breakDecrement}>-</button>
      <div id = "session-label">Session Length</div>
      <div id = "session-length">{sessionLength / 60}</div>
      <button id = "session-increment" onClick = {sessionIncrement}>+</button>
      <button id = "session-decrement" onClick = {sessionDecrement}>-</button>
      <div id = "timer-label">{timerId}</div>
      <div id = "time-left">{Math.floor(timeLeft / 60)}:{timeLeft % 60 < 10? `0`+ timeLeft % 60 : timeLeft % 60}</div>
      <button id = "start_stop" onClick = {toggleRunningTimer}>start/stop</button>
      <button id = "reset" onClick = {resetToDefault}>reset</button>
      <audio id = "beep" src="https://cdn.freecodecamp.org/testable-projects-fcc/audio/BeepSound.wav"></audio>
    </div>
  );
}

export default App;
*/
import './App.css';
import { useState, useRef, useEffect } from 'react';

function App() {
  const [timeLeft, setTimeLeft] = useState(1500); // in seconds
  const [sessionLength, setSessionLength] = useState(1500); // 25 minutes
  const [breakLength, setBreakLength] = useState(300); // 5 minutes
  const [timerId, setTimerId] = useState('session'); // 'session' or 'break'
  const [timerRunning, setTimerRunning] = useState(false);

  const intervalRef = useRef(null); // To store the interval ID
  const beepRef = useRef(null); // To store the beep audio element

  // Effect to handle the timer ticking
  useEffect(() => {
    if (timerRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
      }, 1000);
    } 
    if (timeLeft === 0) {
      playBeep();
      setTimeout(() => {
    if (timerId === 'session') {
      setTimerId('break');
      setTimeLeft(breakLength);
    } else {
      setTimerId('session');
      setTimeLeft(sessionLength);
    }
      },1000);
    }

    return () => clearInterval(intervalRef.current); // Clean up on unmount or timer changes
  }, [timerRunning, timeLeft]);

  function playBeep() {
    beepRef.current.play();
  }

  function resetBeep() {
    beepRef.current.pause();
    beepRef.current.currentTime = 0;
  }

  function resetToDefault() {
    // Stop timer
    setTimerRunning(false);
    clearInterval(intervalRef.current);

    // Reset beep
    resetBeep();

    // Reset lengths
    setSessionLength(1500); // 25 minutes
    setBreakLength(300); // 5 minutes
    setTimeLeft(1500); // Reset to 25 minutes session
    setTimerId('session');
  }

  function breakIncrement() {
    if (breakLength < 3600) { // Max 60 minutes
      setBreakLength(breakLength + 60);
      if (timerId === 'break' && !timerRunning) {
        setTimeLeft(breakLength + 60);
      }
    }
  }

  function breakDecrement() {
    if (breakLength > 60) { // Min 1 minute
      setBreakLength(breakLength - 60);
      if (timerId === 'break' && !timerRunning) {
        setTimeLeft(breakLength - 60);
      }
    }
  }

  function sessionIncrement() {
    if (sessionLength < 3600) { // Max 60 minutes
      setSessionLength(sessionLength + 60);
      if (timerId === 'session' && !timerRunning) {
        setTimeLeft(sessionLength + 60);
      }
    }
  }

  function sessionDecrement() {
    if (sessionLength > 60) { // Min 1 minute
      setSessionLength(sessionLength - 60);
      if (timerId === 'session' && !timerRunning) {
        setTimeLeft(sessionLength - 60);
      }
    }
  }

  function toggleRunningTimer() {
    setTimerRunning((prev) => !prev);
  }

  return (
    <div className="App">
      <h1>Pomodoro Timer</h1>

      <div id="break-label">Break Length</div>
      <div id="break-length">{breakLength / 60}</div>
      <button id="break-increment" onClick={breakIncrement}>+</button>
      <button id="break-decrement" onClick={breakDecrement}>-</button>

      <div id="session-label">Session Length</div>
      <div id="session-length">{sessionLength / 60}</div>
      <button id="session-increment" onClick={sessionIncrement}>+</button>
      <button id="session-decrement" onClick={sessionDecrement}>-</button>

      <div id="timer-label">{timerId === 'session' ? 'Session' : 'Break'}</div>
      <div id="time-left">
        {Math.floor(timeLeft / 60) < 10? `0${Math.floor(timeLeft / 60)}` : Math.floor(timeLeft / 60)}:
        {timeLeft % 60 < 10 ? `0${timeLeft % 60}` : timeLeft % 60}
      </div>

      <button id="start_stop" onClick={toggleRunningTimer}>
        {timerRunning ? 'Pause' : 'Start'}
      </button>
      <button id="reset" onClick={resetToDefault}>Reset</button>

      <audio
        id="beep"
        ref={beepRef}
        src="https://cdn.freecodecamp.org/testable-projects-fcc/audio/BeepSound.wav"
      />
    </div>
  );
}

export default App;
