document.addEventListener('DOMContentLoaded', function () {
    let timerTimeout;
    let startTime;
    let elapsedSeconds = 0; // Track the total elapsed seconds
    let lapCount = 1;

    const hourElement = document.getElementById('hour');
    const minuteElement = document.getElementById('minute');
    const secondElement = document.getElementById('second');
    const startButton = document.getElementById('start');
    const stopButton = document.getElementById('stop');
    const resetButton = document.getElementById('reset');
    const lapButton = document.getElementById('lap');
    const lapContainer = document.querySelector('.lap-container');

    startButton.addEventListener('click', startTimer);
    stopButton.addEventListener('click', stopTimer);
    resetButton.addEventListener('click', resetTimer);
    lapButton.addEventListener('click', recordLap);

    function startTimer() {
        if (!startTime) {
            startTime = new Date().getTime();
        } else {
            const currentTime = new Date().getTime();
            const elapsedTime = (currentTime - startTime) / 1000;
            elapsedSeconds += elapsedTime;
            startTime = currentTime;
        }

        updateTimer();
        timerTimeout = setTimeout(startTimer, 1000);
        toggleButtons(true);
    }

    function stopTimer() {
        clearTimeout(timerTimeout);
        startTime = null;
        toggleButtons(false);
    }

    function resetTimer() {
        clearTimeout(timerTimeout);
        startTime = null;
        elapsedSeconds = 0;
        updateTimerDisplay(0, 0, 0);
        toggleButtons(false);
        lapCount = 1;
        lapContainer.innerHTML = '';
    }

    function updateTimer() {
        const hours = Math.floor(elapsedSeconds / 3600);
        const minutes = Math.floor((elapsedSeconds % 3600) / 60);
        const seconds = Math.floor(elapsedSeconds % 60);

        updateTimerDisplay(hours, minutes, seconds);
    }

    function updateTimerDisplay(hours, minutes, seconds) {
        hourElement.textContent = padZero(hours);
        minuteElement.textContent = padZero(minutes);
        secondElement.textContent = padZero(seconds);
    }

    function padZero(value) {
        return value < 10 ? '0' + value : value;
    }

    function toggleButtons(running) {
        startButton.disabled = running;
        stopButton.disabled = !running;
        resetButton.disabled = !running;
        lapButton.disabled = !running;
    }

    function recordLap() {
        const lapTime = `${hourElement.textContent}:${minuteElement.textContent}:${secondElement.textContent}`;
        const lapDiv = document.createElement('div');
        lapDiv.classList.add('lap');

        const timeDiv = document.createElement('div');
        timeDiv.classList.add('time');
        timeDiv.textContent = lapTime;

        const deleteButtonDiv = document.createElement('div');
        deleteButtonDiv.classList.add('delete-button');
        deleteButtonDiv.innerHTML = '<i class="fas fa-trash text-dark"></i>';

        lapDiv.appendChild(timeDiv);
        lapDiv.appendChild(deleteButtonDiv);

        lapContainer.appendChild(lapDiv);

        lapCount++;
    }
});
