let timeLeft = 300; 
let timerId = null;

const timerDisplay = document.getElementById('timer');
const startBtn = document.getElementById('start-btn');
const resetBtn = document.getElementById('reset-btn');
const rainSound = document.getElementById('break-bg-sound');
const successSound = document.getElementById('success-sound');
const heartContainer = document.getElementById('heart-container');

// Pre-unlock audio on any click
window.addEventListener('click', () => {
    if (rainSound) rainSound.load();
    if (successSound) successSound.load();
}, { once: true });

function updateDisplay() {
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function celebrate() {
    for (let i = 0; i < 20; i++) {
        const heart = document.createElement('div');
        heart.className = 'celebration-heart';
        heart.textContent = '💗';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDelay = Math.random() * 0.5 + 's';
        heartContainer.appendChild(heart);
        setTimeout(() => heart.remove(), 5000);
    }
}

startBtn.addEventListener('click', function() {
    if (timerId !== null) return;

    // Try playing sound immediately on click
    if (rainSound) {
        rainSound.muted = false;
        rainSound.volume = 1.0;
        rainSound.play().catch(err => console.log("Sound blocked by browser."));
    }

    timerId = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            updateDisplay();
        } else {
            clearInterval(timerId);
            timerId = null;
            
            if (rainSound) {
                rainSound.pause();
                rainSound.currentTime = 0;
            }
            if (successSound) successSound.play();
            
            celebrate();
            alert("Rest time is over, my dear friend. ✨💗");
            startBtn.textContent = "Start Break";
        }
    }, 1000);

    startBtn.textContent = "Enjoy the Rain...";
});

resetBtn.addEventListener('click', () => {
    clearInterval(timerId);
    timerId = null;
    timeLeft = 300;
    if (rainSound) {
        rainSound.pause();
        rainSound.currentTime = 0;
    }
    updateDisplay();
    startBtn.textContent = "Start Break";
});