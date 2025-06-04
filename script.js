let [hours, minutes, seconds, milliseconds] = [0, 0, 0, 0];
let timerRef = document.querySelector(".display");
let lapContainer = document.getElementById("lapTimes");
let interval = null;
let running = false;

document.getElementById("start").addEventListener("click", () => {
    if (!running) {
        running = true;
        interval = setInterval(updateStopwatch, 10);
    }
});

document.getElementById("pause").addEventListener("click", () => {
    running = false;
    clearInterval(interval);
});

document.getElementById("reset").addEventListener("click", () => {
    running = false;
    clearInterval(interval);
    [hours, minutes, seconds, milliseconds] = [0, 0, 0, 0];
    timerRef.innerHTML = "00:00:00:00";
    lapContainer.innerHTML = ""; // Clear lap records
});

document.getElementById("lap").addEventListener("click", () => {
    if (running) {
        let lapTime = `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}:${formatMilliseconds(milliseconds)}`;
        let lapItem = document.createElement("li");
        lapItem.textContent = lapTime;
        lapContainer.appendChild(lapItem);
    }
});
function updateStopwatch() {
    milliseconds += 10;
    if (milliseconds === 1000) {
        milliseconds = 0;
        seconds++;
        if (seconds === 60) {
            seconds = 0;
            minutes++;
            if (minutes === 60) {
                minutes = 0;
                hours++;
            }
        }
    }
    timerRef.innerHTML = `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}:${formatMilliseconds(milliseconds)}`;
}

function formatTime(value) {
    return value < 10 ? "0" + value : value;
}

function formatMilliseconds(value) {
    return value < 10 ? "0" + Math.floor(value / 10) : Math.floor(value / 10);
}
