// Function to fetch the current time from Naver's server
async function getNaverTime() {
    try {
        // Naver's time API endpoint
        const response = await fetch('https://naver.com', { method: 'HEAD' });
        // Get the date from the response headers
        const serverTime = response.headers.get('date');
        return new Date(serverTime);
    } catch (error) {
        console.error('Failed to fetch time from Naver, using local time as fallback:', error);
        return new Date(); // Fallback to local time if fetch fails
    }
}

// Function to update the time display
async function updateTime() {
    try {
        // Get the time from Naver's server
        const now = await getNaverTime();
        
        // Format the time as HH:MM:SS
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        
        // Update the time display
        const timeElement = document.getElementById('time');
        timeElement.textContent = `${hours}:${minutes}:${seconds}`;
        
        // Check if it's the start of a new minute (seconds = 00)
        if (seconds === '00') {
            // Add alert class for the first second of each minute
            timeElement.classList.add('alert');
            
            // Remove the alert class after the animation completes
            setTimeout(() => {
                timeElement.classList.remove('alert');
            }, 1000);
        }
    } catch (error) {
        console.error('Error updating time:', error);
    }
}

// Initial time update
updateTime();

// Update the time every second
setInterval(updateTime, 1000);

// Also update the time when the page becomes visible again
document.addEventListener('visibilitychange', () => {
    if (!document.hidden) {
        updateTime();
    }
});
