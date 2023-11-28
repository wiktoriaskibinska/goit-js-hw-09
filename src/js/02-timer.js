// Opisany w dokumentacji
import flatpickr from "flatpickr";
// Dodatkowy import stylów
import "flatpickr/dist/flatpickr.min.css";
//selecting elements
const dateInput = document.querySelector('#datetime-picker');
const timerDays = document.querySelector('span[data-days]');
const timerHours = document.querySelector('span[data-hours]');
const timerMinutes = document.querySelector('span[data-minutes]');
const timerSeconds = document.querySelector('span[data-seconds]');
const startBttn= document.querySelector('button[data-start]')
//
let timerId = null;
//
startBttn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
      console.log(selectedDates[0]);

      const selectedInUnix = selectedDates[0].getTime();

      if (selectedInUnix <= options.defaultDate.getTime()) {
          window.alert("Please choose a date in the future");
          startBttn.disabled = true;
      }
      else {
          window.alert("The date you selected is correct");
          startBttn.disabled = false;

      };
  },
};
//
flatpickr(dateInput, options);
//
startBttn.addEventListener('click', startBttnOnClick)
//
function startBttnOnClick() {
    
    startBttn.disabled = true;
    dateInput.disabled = true;
    timerId = setInterval(() => {
        const currentDate = Date.now();
        const chosenDate = new Date(dateInput.value).getTime();
        const ms = chosenDate - currentDate;
        const { days, hours, minutes, seconds } = convertMs(ms);
        
        timerDays.textContent = addLeadingZero(days);
        timerHours.textContent = addLeadingZero(hours);
        timerMinutes.textContent =addLeadingZero(minutes);
        timerSeconds.textContent = addLeadingZero(seconds);

        if (ms < 1000) {
        dateInput.disabled = false;
        startBttn.disabled = false;
        clearInterval(timerId);
        
        
    }
    }, 1000);  
};
//
function convertMs(ms) {
// Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

// Remaining days
  const days = Math.floor(ms / day);
// Remaining hours
  const hours = Math.floor((ms % day) / hour);
// Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
// Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
};

function addLeadingZero(value) {
  return `${value}`.padStart(2, '0');
}