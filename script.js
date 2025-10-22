let time = Date.now()
const timeElement = document.querySelector('.current-time');

setInterval(() => {
  time += 1000;
  timeElement.textContent = time;
}, 1000)