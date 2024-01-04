import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';


const input = document.querySelector('#datetime-picker');
const button = document.querySelector("button[data-start]")
const valueDay = document.querySelector("span[data-days]")
const valueHours = document.querySelector("span[data-hours]")
const valueMinutes = document.querySelector("span[data-minutes]")
const valueSeconds = document.querySelector("span[data-seconds]")
const labels = document.querySelectorAll(".label")

button.disabled = true;
labels.forEach(elem =>elem.textContent= elem.textContent.toUpperCase())

let userSelectedDate, timeNow;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    userSelectedDate = selectedDates[0];
    if(userSelectedDate < options.defaultDate){
      button.disabled = true;
      iziToast.error({
        message: 'Please choose a date in the future',
        position: "topCenter",
    });
    }
    else{
    button.disabled = false;
    userSelectedDate = selectedDates[0];
    }
  },
};


flatpickr(input, options);

button.addEventListener("click", ()=>{
  //додаткова перевірка для моменту, коли закривалось вікно значення пройшло валідацію, а по старту вже не валідується
  timeNow=Date.now();
  if(userSelectedDate<timeNow){
    button.disabled = true;
  }
  else{
    button.disabled = true;
    input.disabled = true;
    const interval = setInterval(()=>{
      timeNow=Date.now();
      const valuesForTimer= convertMs(userSelectedDate-timeNow-1000)

      const lastValues=addLeadingZero(valuesForTimer);
      const {days,hours,minutes,seconds} = lastValues;

      valueDay.textContent=days;
      valueHours.textContent=hours;
      valueMinutes.textContent=minutes;
      valueSeconds.textContent=seconds;

      if(valueDay.textContent=="00" && valueHours.textContent=="00" && 
      valueMinutes.textContent=="00" && valueSeconds.textContent=="00"){
        clearInterval(interval);
        button.disabled = false;
        input.disabled = false;
      }
    },1000);
  }
})

function addLeadingZero({days,hours,minutes,seconds}){
  days=String(days).padStart(2,"0");
  hours=String(hours).padStart(2,"0");
  minutes=String(minutes).padStart(2,"0");
  seconds=String(seconds).padStart(2,"0");
  return{days,hours,minutes,seconds}
}

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
}
