(()=>{
   "use strict";
   let breakLength = 300;
   let sessionLength = 1500;
   let clockT = sessionLength;
   let timerPaused = true;
   let onBreak = false;
   let CLOCK_PIXEL_HEIGHT = 286;
   let setBreakLength = (newLength)=> {
     breakLength = (newLength <= 0) ? 0 : newLength;
     notify();
   }
   let setSessionLength = (newLength)=> {
     sessionLength = (newLength <= 0) ? 0 : newLength;
     notify();
   }
   let setClockTime = (s)=> {
     clockT = s;
     notify();
   }
   let getClockTime = ()=> {
     return clockT;
   }
   let intervalTimer;
   window.toggleTimer = ()=> {
     timerPaused = !timerPaused;
     if (!timerPaused) startTimer();
     else stopTimer();
   };
   let startTimer = ()=> {
     notify();
     intervalTimer = setInterval(tick, 1000);
   }
   let stopTimer = ()=> {
     clearInterval(intervalTimer);
   }
   let tick = ()=> {
     if (getClockTime() <= 0) {
       stopTimer();
       toggleBreak();
       return;
    }
     setClockTime(getClockTime() - 1);
   }
   let toggleBreak = ()=> {
     onBreak = !onBreak;
     setClockTime(onBreak ? breakLength : sessionLength);
     startTimer();
   }
   window.breakMinus = ()=> {
     incBreakLength(-60);
   };
   window.breakPlus = ()=>{
     incBreakLength(60);
   };
   window.sessionMinus = ()=>{
     incSessionLength(-60);
   };
   window.sessionPlus = ()=>{
     incSessionLength(60);
   };
   window.reset = ()=>{
     stopTimer();
     timerPaused = true;
     onBreak = false;
     setClockTime(sessionLength);
   };
   let incBreakLength = (inc)=> {
     setBreakLength(breakLength + inc);
     if (timerPaused && onBreak) {
       setClockTime(breakLength);
     }
   }
   let incSessionLength = (inc)=> {
     setSessionLength(sessionLength + inc);
     if (timerPaused && !onBreak) {
       setClockTime(sessionLength);
     }
   }
   let notify = (()=> {
     let prevBreakLength;
     let prevSessionLength;
     return ()=> {
       document.getElementById('timer').innerHTML = formatClockDisplay();
       document.getElementById('title').innerHTML = onBreak ? 'Break' : 'Session';
       document.getElementById('fill').style.backgroundColor = onBreak ? 'red' : 'green';
       document.getElementById('fill').style.height = fillHeight();
       if (prevBreakLength !== breakLength) {
         document.getElementById('break-length').innerHTML = breakLength /  60;
         prevBreakLength = breakLength;
       }
       if (prevSessionLength !== sessionLength) {
         document.getElementById('session-length').innerHTML = sessionLength / 60;
         prevSessionLength = sessionLength;
       }
     };
   })();
   let formatClockDisplay = ()=> {
     let time = getClockTime();
     let mins = Math.floor(time /  60);
     let secs = clockT % 60;
     secs = secs <  10 ? '0' + secs : secs;
     return (timerPaused && time === sessionLength) ? mins : mins + ':' + secs;
   }
   let fillHeight = (()=> {
     let fillBreakLength = breakLength;
     let fillSessionLength = sessionLength;
     let prevOnBreak = onBreak;
     return ()=> {
       if (timerPaused || prevOnBreak !== onBreak) {
         fillBreakLength = breakLength;
         fillSessionLength = sessionLength;
         prevOnBreak = onBreak;
       }
       let period = onBreak ? fillBreakLength : fillSessionLength;
       let left = getClockTime();
       return (period - left) /  period * CLOCK_PIXEL_HEIGHT + 'px';
     };
   })();
   document.getElementById('bMinus').addEventListener("click", breakMinus);
   document.getElementById('bPlus').addEventListener("click", breakPlus);
   document.getElementById('sMinus').addEventListener("click", sessionMinus);
   document.getElementById('sPlus').addEventListener("click", sessionPlus);
   document.getElementById('container').addEventListener("click", toggleTimer);
 })();
