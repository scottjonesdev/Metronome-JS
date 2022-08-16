import Timer from './timer.js';

const tempoDisplay = document.querySelector('.tempo');
const decreaseTempoBtn = document.querySelector('.decrease-bpm');
const increaseTempoBtn = document.querySelector('.increase-bpm');
const tempoSlider = document.querySelector('.slider');
const startStopBtn = document.querySelector('.toggle-metronome');

const kick = new Audio('kick.wav');

let bpm = 120;
let count = 0;
let isRunning = false;

decreaseTempoBtn.addEventListener('click', () => {
	if (bpm <= 30) { return };
	bpm--;
	updateMetronome();
});

increaseTempoBtn.addEventListener('click', () => {
    if (bpm >= 240) { return };
    bpm++;
    updateMetronome();
});

tempoSlider.addEventListener('input', () => {
    bpm = tempoSlider.value;
    validateTempo();
    updateMetronome();
});

startStopBtn.addEventListener('click', () => {
    count = 0;
    if (!isRunning) {
        metronome.start();
        isRunning = true;
        startStopBtn.textContent = 'STOP';
        startStopBtn.style.backgroundColor = '#ff0040';
    } else {
        metronome.stop();
        isRunning = false;
        startStopBtn.textContent = 'START';
        startStopBtn.style.backgroundColor = '#30C930';
    }
});

function updateMetronome() {
    tempoDisplay.textContent = bpm;
    tempoSlider.value = bpm;
    metronome.timeInterval = 60000 / bpm;
}

function validateTempo() {
    if (bpm <= 30) { return };
    if (bpm >= 240) { return };
}

function playClick() {
    kick.play();
    kick.currentTime = 0;
}

const metronome = new Timer(playClick, 60000 / bpm, { immediate: true });