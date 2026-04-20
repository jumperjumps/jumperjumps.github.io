
const moles = document.querySelectorAll('.mole');
let gameRunning = false;
let timeoutId = null;

// Score
let score = 0;
const scoreDisplay = document.getElementById('scoreValue');

// Mole types (these repeat infinitely)
const moleTypes = [
  { img: "assets/Mole(-1).png", value: -1 },
  { img: "assets/Mole(-3).png", value: -3 },
  { img: "assets/Mole(-30).png", value: -30 },
  { img: "assets/Mole(+1).png", value: 1 },
  { img: "assets/Mole(+5).png", value: 5 },
  { img: "assets/Mole(+10).png", value: 10 },
  { img: "assets/Mole(+20).png", value: 20 },
  { img: "assets/Mole(+30).png", value: 30 },
  { img: "assets/Mole(+50).png", value: 50 }
];

function randomTime(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function randomMole() {
  return moles[Math.floor(Math.random() * moles.length)];
}

function popUp() {
  if (!gameRunning) return;

  const mole = randomMole();

  // Pick a random mole type — repeats allowed
  const type = moleTypes[Math.floor(Math.random() * moleTypes.length)];

  mole.style.backgroundImage = `url(${type.img})`;
  mole.dataset.value = type.value;

  mole.classList.add('up');

  let hideTime = randomTime(1000, 2000);

  mole.onmouseenter = () => {
    hideTime = 300;
  }

  timeoutId = setTimeout(() => {
    mole.classList.remove('up');
    mole.onmouseenter = null;
    popUp();
  }, hideTime);
}

// Clicking a mole adds score
moles.forEach(mole => {
  mole.addEventListener('click', () => {
    if (mole.classList.contains('up')) {
      const value = parseInt(mole.dataset.value);
      score += value;
      scoreDisplay.textContent = score;

      mole.classList.remove('up');
    }
  });
});

// Start button
document.getElementById('startBtn').addEventListener('click', () => {
  if (!gameRunning) {
    gameRunning = true;
    score = 0;
    scoreDisplay.textContent = score;
    popUp();
  }
});

// Submit button (stop game)
document.getElementById('submitBtn').addEventListener('click', () => {
  gameRunning = false;
  clearTimeout(timeoutId);

  moles.forEach(m => m.classList.remove('up'));
});


