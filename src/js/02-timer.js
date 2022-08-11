import flatpickr from 'flatpickr';

import 'flatpickr/dist/flatpickr.min.css';

import Notiflix from 'notiflix';

const startBtn = document.querySelector('button[data-start');
const dateTimePicker = document.querySelector('#datetime-picker');
const timerDays = document.querySelector('[data-days');
const timerHours = document.querySelector('[data-hours');
const timerMinutes = document.querySelector('[data-minutes');
const timerSeconds = document.querySelector('[data-seconds');
let ms = null;

startBtn.disabled = true;

// flatpickr library
flatpickr(dateTimePicker, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  // alert 
  onClose(selectedDates) {
    const selectedMs = selectedDates[0].getTime();
    if (selectedMs <= new Date().getTime()) {
      Notiflix.Notify.failure('Please choose a date in the future');
      startBtn.disabled = true;
    }
    else {
      startBtn.disabled = false;
      // function to calculate get remaining time & set interval
      function convertMs(ms) {
        let counterDown = setInterval(() => {
          ms = selectedMs - new Date().getTime();
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

          //add leading zero
          const addLeadingZero = value => value.toString().padStart(2, '0');
          //pass remainig time to timer textContents
          timerDays.textContent = addLeadingZero(days);
          timerHours.innerHTML = addLeadingZero(hours);
          timerMinutes.innerHTML = addLeadingZero(minutes);
          timerSeconds.textContent = addLeadingZero(seconds);

          if (ms <= 0) {
            clearInterval(counterDown);
            timerDays.textContent = '00';
            timerHours.innerHTML = '00';
            timerMinutes.innerHTML = '00';
            timerSeconds.textContent = '00';
          }
        }, 1000);
      }
      // run timer on startBtn
      startBtn.addEventListener('click', convertMs);
    }
  },
});