const watch = document.querySelector("#watch");
const lapList = document.querySelector("#lap-list");
let milliseconds = 0;
let timer;
let lapCounter = 1;

function startWatch() {
    watch.classList.remove("paused");
    clearInterval(timer);
    timer = setInterval(() => {
        milliseconds += 10;
        updateWatch();
    }, 10);
}

function pauseWatch() {
    watch.classList.add("paused");
    clearInterval(timer);
}

function resetWatch() {
    watch.classList.remove("paused");
    clearInterval(timer);
    milliseconds = 0;
    updateWatch();
    lapList.innerHTML = "";
    lapCounter = 1;
}

function updateWatch() {
    let dateTimer = new Date(milliseconds);
    watch.innerHTML =
        ("0" + dateTimer.getUTCHours()).slice(-2) +
        ":" +
        ("0" + dateTimer.getUTCMinutes()).slice(-2) +
        ":" +
        ("0" + dateTimer.getUTCSeconds()).slice(-2) +
        ":" +
        ("0" + dateTimer.getUTCMilliseconds()).slice(-3, -1);
}

function recordLap() {
    const lapTime = watch.innerHTML;
    const lapItem = document.createElement("li");
    lapItem.textContent = `Lap ${lapCounter}: ${lapTime}`;
    lapList.appendChild(lapItem);
    lapCounter++;
}

document.addEventListener("click", (e) => {
    const el = e.target;
    if (el.id === "start") startWatch();
    if (el.id === "pause") pauseWatch();
    if (el.id === "reset") resetWatch();
    if (el.id === "lap") recordLap();
});
