const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop');

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

startBtn.addEventListener("click", handleEvent);
let timerId = null;
function handleEvent() {
  timerId = setInterval(() => {
    document.body.style.background = getRandomHexColor();
  }, 1000);
  startBtn.disabled = true;
}

stopBtn.addEventListener("click", stopEvent);
function stopEvent() {
  clearInterval(timerId);
  console.log(`Interval with id ${timerId} has stopped!`);
  startBtn.disabled = false;
};




