document.addEventListener('DOMContentLoaded', (event) => {
    // Language Support
    const translations = {
        en: {
            title: "Time Tracker for Kids",
            languageLabel: "Language:",
            timeInputLabel: "Set Timer (minutes):",
            startButton: "Start Countdown",
            timeUp: "Time's up!"
        },
        sv: {
            title: "Tidsspårare för barn",
            languageLabel: "Språk:",
            timeInputLabel: "Ställ in timer (minuter):",
            startButton: "Starta nedräkning",
            timeUp: "Tiden är ute!"
        }
    };

    function updateLanguage(lang) {
        document.getElementById('title').textContent = translations[lang].title;
        document.querySelector('.language-switcher label').textContent = translations[lang].languageLabel;
        document.getElementById('timeInputLabel').textContent = translations[lang].timeInputLabel;
        document.getElementById('startButton').textContent = translations[lang].startButton;
    }

    const languageSelect = document.getElementById('languageSelect');
    languageSelect.addEventListener('change', (event) => {
        const selectedLanguage = event.target.value;
        updateLanguage(selectedLanguage);
    });

    updateLanguage(languageSelect.value);

    // Analog Clock
    function drawClock() {
        const canvas = document.getElementById('analogClock');
        const ctx = canvas.getContext('2d');
        const radius = canvas.height / 2;
        ctx.translate(radius, radius);
        setInterval(() => {
            drawFace(ctx, radius);
            drawNumbers(ctx, radius);
            drawTime(ctx, radius);
        }, 1000);
    }

    function drawFace(ctx, radius) {
        ctx.beginPath();
        ctx.arc(0, 0, radius, 0, 2 * Math.PI);
        ctx.fillStyle = 'white';
        ctx.fill();
        ctx.strokeStyle = '#333';
        ctx.lineWidth = radius * 0.1;
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(0, 0, radius * 0.1, 0, 2 * Math.PI);
        ctx.fillStyle = '#333';
        ctx.fill();

        // Set background color based on day or night
        const currentTime = new Date();
        const hours = currentTime.getHours();
        if (hours >= 6 && hours < 18) {
            document.getElementById('analogClock').classList.add('daytime');
            document.getElementById('analogClock').classList.remove('nighttime');
        } else {
            document.getElementById('analogClock').classList.add('nighttime');
            document.getElementById('analogClock').classList.remove('daytime');
        }
    }

    function drawNumbers(ctx, radius) {
        let ang;
        let num;
        ctx.font = radius * 0.15 + "px Arial";
        ctx.textBaseline = "middle";
        ctx.textAlign = "center";
        for (num = 1; num < 13; num++) {
            ang = num * Math.PI / 6;
            ctx.rotate(ang);
            ctx.translate(0, -radius * 0.85);
            ctx.rotate(-ang);
            ctx.fillText(num.toString(), 0, 0);
            ctx.rotate(ang);
            ctx.translate(0, radius * 0.85);
            ctx.rotate(-ang);
        }
    }

    function drawTime(ctx, radius) {
        const now = new Date();
        let hour = now.getHours();
        let minute = now.getMinutes();
        let second = now.getSeconds();

        // Hour
        hour = hour % 12;
        hour = (hour * Math.PI / 6) + (minute * Math.PI / (6 * 60)) + (second * Math.PI / (360 * 60));
        drawHand(ctx, hour, radius * 0.5, radius * 0.07);

        // Minute
        minute = (minute * Math.PI / 30) + (second * Math.PI / (30 * 60));
        drawHand(ctx, minute, radius * 0.8, radius * 0.07);

        // Second
        second = (second * Math.PI / 30);
        drawHand(ctx, second, radius * 0.9, radius * 0.02);
    }

    function drawHand(ctx, pos, length, width) {
        ctx.beginPath();
        ctx.lineWidth = width;
        ctx.lineCap = "round";
        ctx.moveTo(0, 0);
        ctx.rotate(pos);
        ctx.lineTo(0, -length);
        ctx.stroke();
        ctx.rotate(-pos);
    }

    drawClock();

    // Countdown Timer
    let countdownInterval;

    function startCountdown(minutes) {
        clearInterval(countdownInterval);
        let seconds = minutes * 60;
        updateCountdownDisplay(seconds);
        updateProgressBar(seconds, seconds);

        countdownInterval = setInterval(() => {
            seconds--;
            if (seconds <= 0) {
                clearInterval(countdownInterval);
                alert(translations[languageSelect.value].timeUp);
            }
            updateCountdownDisplay(seconds);
            updateProgressBar(seconds, minutes * 60);
        }, 1000);
    }

    function updateCountdownDisplay(seconds) {
        const minutes = Math.floor(seconds / 60);
        const displaySeconds = seconds % 60;
        document.getElementById('countdownDisplay').textContent =
            `${String(minutes).padStart(2, '0')}:${String(displaySeconds).padStart(2, '0')}`;
    }

    function updateProgressBar(seconds, totalSeconds) {
        const progressBar = document.querySelector('#progressBar circle:nth-child(2)');
        const progress = 691 - (691 * (seconds / totalSeconds)); // 691 is the circumference of the circle (2πr where r=110)
        progressBar.style.strokeDashoffset = progress;
    }

    document.getElementById('startButton').addEventListener('click', () => {
        const minutes = parseInt(document.getElementById('timeInput').value, 10);
        if (!isNaN(minutes) && minutes > 0) {
            startCountdown(minutes);
        } else {
            alert('Please enter a valid number of minutes.');
        }
    });
});
