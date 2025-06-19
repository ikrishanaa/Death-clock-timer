// Set current date
function updateDate() {
    const now = new Date();
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    
    const dayName = days[now.getDay()];
    const date = now.getDate();
    const month = months[now.getMonth()];
    
    document.getElementById('current-date').textContent = `${dayName}, ${date} ${month}`;
}

// Get time of day for greeting
function getGreeting() {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
}

// Update greeting based on time of day
document.getElementById('greeting-text').textContent = getGreeting();

// Calculate and update countdown
function updateCountdown() {
    const now = new Date();
    const deathYear = localStorage.getItem('deathYear') || 2050;
    const deathDate = new Date(deathYear, 0, 1);
    
    const diff = deathDate - now;
    
    // Calculate time units
    const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
    const days = Math.floor((diff % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    // Update the countdown elements
    document.getElementById('years').textContent = years;
    document.getElementById('days').textContent = days;
    document.getElementById('hours').textContent = hours;
    document.getElementById('minutes').textContent = minutes;
    document.getElementById('seconds').textContent = seconds;
}

// Save username to localStorage
document.getElementById('username').addEventListener('change', function() {
    localStorage.setItem('username', this.value);
});

// Load username from localStorage if available
if (localStorage.getItem('username')) {
    document.getElementById('username').value = localStorage.getItem('username');
}

// Load goal from localStorage if available
if (localStorage.getItem('dailyGoal')) {
    document.querySelector('.editable-goal').textContent = localStorage.getItem('dailyGoal');
}

// Load balance from localStorage if available
if (localStorage.getItem('currentBalance')) {
    document.querySelector('.editable-balance').textContent = localStorage.getItem('currentBalance');
}

// Save goal when edited
document.querySelector('.editable-goal').addEventListener('blur', function() {
    localStorage.setItem('dailyGoal', this.textContent);
    updateLastUpdateDate();
});

// Save balance when edited
document.querySelector('.editable-balance').addEventListener('blur', function() {
    localStorage.setItem('currentBalance', this.textContent);
    updateLastUpdateDate();
});

// Update last update date
function updateLastUpdateDate() {
    const now = new Date();
    const options = { month: 'short', day: 'numeric' };
    document.getElementById('last-update-date').textContent = now.toLocaleDateString('en-US', options);
}

// Update current death year display
function updateCurrentDeathYear() {
    const yearSpan = document.getElementById('currentDeathYear');
    const savedYear = localStorage.getItem('deathYear');
    if (savedYear) {
        yearSpan.textContent = savedYear;
    } else {
        yearSpan.textContent = "Not set";
    }
}

// Check if it's the first visit and show modal if it is
if (!localStorage.getItem('deathYear')) {
    document.getElementById('deathYearModal').style.display = 'block';
}

// Open the death year modal when button is clicked
document.getElementById('openDeathYearModal').addEventListener('click', function() {
    document.getElementById('deathYearModal').style.display = 'block';
    updateCurrentDeathYear();
    
    // Pre-fill input with current value if it exists
    const currentYear = localStorage.getItem('deathYear');
    if (currentYear) {
        document.getElementById('deathYear').value = currentYear;
    }
});

// Close the modal when X is clicked
document.getElementById('closeModal').addEventListener('click', function() {
    document.getElementById('deathYearModal').style.display = 'none';
});

// Close modal when clicking outside of it
window.addEventListener('click', function(event) {
    if (event.target == document.getElementById('deathYearModal')) {
        document.getElementById('deathYearModal').style.display = 'none';
    }
    if (event.target == document.getElementById('successModal')) {
        document.getElementById('successModal').style.display = 'none';
    }
});

// Handle death year submission
document.getElementById('submitDeathYear').addEventListener('click', function() {
    const deathYear = document.getElementById('deathYear').value;
    
    if (deathYear && deathYear >= 2025) {
        localStorage.setItem('deathYear', deathYear);
        document.getElementById('deathYearModal').style.display = 'none';
        
        // Show success message
        const successModal = document.getElementById('successModal');
        successModal.style.display = 'block';
        
        // Auto-hide success message after 2 seconds
        setTimeout(function() {
            successModal.classList.add('fade-out');
            setTimeout(function() {
                successModal.style.display = 'none';
                successModal.classList.remove('fade-out');
            }, 1500);
        }, 2000);
        
        updateCountdown();
    } else {
        alert('Please enter a valid year (2025 or later)');
    }
});

// Handle search functionality
document.getElementById('search-button').addEventListener('click', function() {
    const query = document.getElementById('search-input').value.trim();
    if (query) {
        window.open(`https://www.google.com/search?q=${encodeURIComponent(query)}`, '_blank');
    }
});

document.getElementById('search-input').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        const query = this.value.trim();
        if (query) {
            window.open(`https://www.google.com/search?q=${encodeURIComponent(query)}`, '_blank');
        }
    }
});

// Update date and countdown on page load
updateDate();
updateCurrentDeathYear();
if (localStorage.getItem('deathYear')) {
    updateCountdown();
}

// Update countdown every second
setInterval(updateCountdown, 1000);

// Days Visualization
function updateDaysVisualization() {
    const now = new Date();
    const year = now.getFullYear();
    const startOfYear = new Date(year, 0, 0);
    const diff = now - startOfYear;
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);
    const isLeapYear = (year % 400 === 0) || (year % 100 !== 0 && year % 4 === 0);
    const totalDays = isLeapYear ? 366 : 365;
    const weeks = 52;

    // Update month headers
    const monthsHeader = document.getElementById('monthsHeader');
    monthsHeader.innerHTML = '';
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    // Create month labels with equal spacing
    const monthPositions = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
    if (isLeapYear) {
        for (let i = 2; i < monthPositions.length; i++) {
            monthPositions[i]++;
        }
    }

    monthNames.forEach((month, index) => {
        const monthEl = document.createElement('div');
        monthEl.textContent = month;
        monthEl.style.gridColumn = `${Math.floor(monthPositions[index] / 7) + 1} / span ${Math.floor((monthPositions[index+1] || totalDays) / 7) - Math.floor(monthPositions[index] / 7) + 1}`;
        monthEl.style.textAlign = 'center';
        monthsHeader.appendChild(monthEl);
    });

    // Create day boxes with vertical filling (7 rows exactly)
    const daysGrid = document.getElementById('daysGrid');
    daysGrid.innerHTML = '';
    daysGrid.style.gridTemplateRows = 'repeat(7, 1fr)';
    daysGrid.style.gridTemplateColumns = `repeat(${weeks}, 1fr)`;

    // Create days with vertical filling (column-wise)
    for (let day = 0; day < 7; day++) {
        for (let week = 0; week < weeks; week++) {
            const dayIndex = week * 7 + day;
            if (dayIndex < totalDays) {
                const dayBox = document.createElement('div');
                dayBox.className = 'day-box';
                if (dayIndex < dayOfYear) {
                    dayBox.classList.add('passed');
                }
                daysGrid.appendChild(dayBox);
            }
        }
    }

    // Add leap year extra box
    if (isLeapYear) {
        const leapBox = document.createElement('div');
        leapBox.className = 'day-box';
        leapBox.style.gridColumn = '53';
        leapBox.style.gridRow = '1';
        if (365 < dayOfYear) {
            leapBox.classList.add('passed');
        }
        daysGrid.appendChild(leapBox);
    }
}

// Initialize and update daily
updateDaysVisualization();
setInterval(() => {
    const now = new Date();
    if (now.getHours() === 0 && now.getMinutes() === 0 && now.getSeconds() === 0) {
        updateDaysVisualization();
    }
}, 1000);
