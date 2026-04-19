const moles = document.querySelectorAll('.mole');
let gameRunning = false;
let timeoutId = null;

function randomTime(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function randomMole() {
  return moles[Math.floor(Math.random() * moles.length)];
}

function popUp() {
  if (!gameRunning) return;

  const mole = randomMole();
  mole.classList.add('up');

  let hideTime = randomTime(1000, 2000);

  mole.onmouseenter = () => {
    hideTime = 300;
  };

  timeoutId = setTimeout(() => {
    mole.classList.remove('up');
    mole.onmouseenter = null;
    popUp();
  }, hideTime);
}

document.getElementById('startBtn').addEventListener('click', () => {
  if (!gameRunning) {
    gameRunning = true;
    popUp();
  }
});

document.getElementById('submitBtn').addEventListener('click', () => {
  gameRunning = false;
  clearTimeout(timeoutId);

  // Hide all moles immediately
  moles.forEach(m => m.classList.remove('up'));
});