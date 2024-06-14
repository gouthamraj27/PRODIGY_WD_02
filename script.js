const display = document.getElementById('display');
const progressBar = document.getElementById('progress-bar');
let startTime;
let running = false;
let timer;

function startStop() {
    if (running) {
        clearInterval(timer);
        running = false;
        document.getElementById("startStop").textContent = "Start";
    } else {
        startTime = Date.now();
        timer = setInterval(updateDisplay, 10);
        running = true;
        document.getElementById("startStop").textContent = "Stop";
    }
}

function updateDisplay() {
    const elapsedTime = Date.now() - startTime;
    const formattedTime = formatTime(elapsedTime);
    display.textContent = formattedTime;
    updateProgressBar(elapsedTime);
}

function formatTime(time) {
    const hours = Math.floor(time / (1000 * 60 * 60));
    const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((time % (1000 * 60)) / 1000);
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function updateProgressBar(time) {
    const percentage = (time % 60000) / 60000 * 100;
    progressBar.style.width = `${percentage}%`;
}

function lapReset() {
    if (running) {
        const lapTime = Date.now() - startTime;
        const lapItem = document.createElement("li");
        lapItem.textContent = formatTime(lapTime);
        document.getElementById("laps").appendChild(lapItem);
    }
}

function resetTimer() {
    clearInterval(timer);
    display.textContent = "00:00:00";
    progressBar.style.width = "0";
    document.getElementById("laps").innerHTML = "";
    running = false;
    document.getElementById("startStop").textContent = "Start";
}

document.getElementById("startStop").addEventListener("click", startStop);
document.getElementById("lapReset").addEventListener("click", lapReset);
document.getElementById("reset").addEventListener("click", resetTimer);
