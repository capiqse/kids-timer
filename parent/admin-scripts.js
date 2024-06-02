document.addEventListener('DOMContentLoaded', (event) => {
    // Function to update clock
    function updateClock() {
        const hours = parseInt(document.getElementById('hourInput').value, 10) || 0;
        const minutes = parseInt(document.getElementById('minuteInput').value, 10) || 0;
        const seconds = parseInt(document.getElementById('secondInput').value, 10) || 0;

        // Validate input values
        if (hours < 0 || hours > 23 || minutes < 0 || minutes > 59 || seconds < 0 || seconds > 59) {
            alert('Please enter valid values for hours, minutes, and seconds.');
            return;
        }

        // Update clock hands (sample code, modify as needed)
        // const hourHand = document.getElementById('hourHand');
        // const minuteHand = document.getElementById('minuteHand');
        // const secondHand = document.getElementById('secondHand');
        // hourHand.style.transform = `rotate(${hours * 30}deg)`;
        // minuteHand.style.transform = `rotate(${minutes * 6}deg)`;
        // secondHand.style.transform = `rotate(${seconds * 6}deg)`;
    }

    // Event listener for the "Update Clock" button
    document.getElementById('updateClockButton').addEventListener('click', updateClock);
});
