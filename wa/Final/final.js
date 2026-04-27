
const moles = document.querySelectorAll('.mole');
let gameRunning = false;
let timeoutId = null;

let score = 0;
const scoreDisplay = document.getElementById('scoreValue');

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

// moles are random between the various pngs and that the pngs do not over lap
function randomMole() {
  const available = [...moles].filter(m => !m.classList.contains('up'));
  if (available.length === 0) return null;
  if (!available) return; 
  return available[Math.floor(Math.random() * moles.length)];
}

function popUp() {
  const mole = randomMole();
  const type = moleTypes[Math.floor(Math.random() * moleTypes.length)];

  if (!gameRunning) return;

  mole.style.backgroundImage = `url("${type.img}")`;
  mole.dataset.value = type.value;
  mole.classList.add('up');

  let hideTime = randomTime(900, 1500);

  mole.onmouseenter = () => {
    hideTime = 300;
  }

  // the timer for when the moles popup
  timeoutId = setTimeout(() => {
    mole.classList.remove('up');
    mole.onmouseenter = null;
    popUp();
  }, hideTime);
};

//add score when hit the mole and restart the timeoutID
moles.forEach(mole => {
  mole.addEventListener('click', () => {
    if (mole.classList.contains('up')) {
      clearTimeout(timeoutId);
      const value = parseInt(mole.dataset.value);
      score += value;
      score = Math.max(0, Math.min(100, score));
      scoreDisplay.textContent = score;
      mole.classList.remove('up');
      popUp();
    }
  });
});


document.getElementById('startBtn').addEventListener('click', () => {
  if (!gameRunning) {
    gameRunning = true;
    score = 0;
    scoreDisplay.textContent = score;
     document.getElementById('scoreOverlay').classList.remove('active');
    popUp();
  }
});


document.getElementById('submitBtn').addEventListener('click', () => {
  gameRunning = false;
  clearTimeout(timeoutId);
  moles.forEach(m => m.classList.remove('up'));
  document.getElementById('scoreFinal').textContent = scoreDisplay.textContent;
  document.getElementById('scoreOverlay').classList.add('active');
});


