import Notiflix from 'notiflix';

function createPromise(position, delay) {
  delay = delay.value;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
      // Fulfill
        resolve({ position, delay });
      }
      else {
      // Rejectreject({ position, delay });
        reject({ position, delay });
      }
    }, delay);
  });
}

const form = document.querySelector('.form');
const { delay, step, amount } = document.querySelector('form');
let position = null;

// submit form handleEvent
form.addEventListener('submit', handleEvent);

function handleEvent(e) {
  e.preventDefault();

  // loop for promise generator
  for (let i = 0; i < amount.value; i++) {
    setTimeout(() => {
      position = i + 1;

    createPromise(position, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`,
          {
            useIcon: false,
          }
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`,
          {
            useIcon: false,
          }
        );
      });
    }, i * step.value);
  }
}