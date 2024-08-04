// script.js
const startButton = document.getElementById('startButton');
const pauseButton = document.getElementById('pauseButton');
const resetButton = document.getElementById('resetButton');
const lapButton = document.getElementById('lapButton');
const display = document.getElementById('display');
const lapList = document.getElementById('lapList');
const darkModeToggle = document.getElementById('darkModeToggle');

let timerInterval;
let startTime;
let elapsedTime = 0;
let isRunning = false;

const formatTime = (time) => {
    const hours = String(Math.floor(time / 3600000)).padStart(2, '0');
    const minutes = String(Math.floor((time % 3600000) / 60000)).padStart(2, '0');
    const seconds = String(Math.floor((time % 60000) / 1000)).padStart(2, '0');
    const milliseconds = String(Math.floor((time % 1000) / 10)).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}<span class="ms">.${milliseconds}</span>`;
};

const updateDisplay = () => {
    elapsedTime = Date.now() - startTime;
    display.innerHTML = formatTime(elapsedTime);
};

const startTimer = () => {
    if (isRunning) return;
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(updateDisplay, 10); // Update every 10 milliseconds
    isRunning = true;
};

const pauseTimer = () => {
    clearInterval(timerInterval);
    isRunning = false;
};

const resetTimer = () => {
    clearInterval(timerInterval);
    isRunning = false;
    elapsedTime = 0;
    display.innerHTML = formatTime(elapsedTime);
    lapList.innerHTML = '';
};

const addLap = () => {
    if (!isRunning) return;
    const lapTime = document.createElement('div');
    lapTime.className = 'lap';
    lapTime.innerHTML = formatTime(elapsedTime);
    lapList.appendChild(lapTime);
};

const toggleDarkMode = () => {
    document.body.classList.toggle('dark-mode');
};

startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);
lapButton.addEventListener('click', addLap);
darkModeToggle.addEventListener('click', toggleDarkMode);
