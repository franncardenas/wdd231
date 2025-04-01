// Calendar

const calendarDiv = document.getElementById("calendar");

const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const today = new Date();
const currentMonth = monthNames[today.getMonth()];

const monthHeading = document.createElement("h2");
monthHeading.textContent = currentMonth + " " + today.getFullYear();

calendarDiv.insertBefore(monthHeading, calendarDiv.firstChild);


const events = [
    { date: '2024-10-25', title: 'Business Networking' },
    { date: '2024-11-02', title: 'Workshop on Marketing' }
];


const calendarGrid = document.createElement('div');
calendarGrid.style.display = 'grid';
calendarGrid.style.gridTemplateColumns = 'repeat(7, 1fr)';
calendarGrid.style.gridGap = '10px';


for (let day = 1; day <= 31; day++) {
    let dayDiv = document.createElement('div');
    dayDiv.textContent = day;
    dayDiv.style.padding = '10px';
    dayDiv.style.backgroundColor = '#fff';
    dayDiv.style.border = '1px solid #ddd';
    dayDiv.style.textAlign = 'center';


    let event = events.find(event => event.date === `2024-10-${day < 10 ? '0' + day : day}`);
    if (event) {
        dayDiv.style.backgroundColor = '#ffeb3b';
        dayDiv.title = event.title;
    }

    calendarGrid.appendChild(dayDiv);
}

calendarDiv.appendChild(calendarGrid);


const ctx = document.getElementById('myChart').getContext('2d');
const myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Free', 'Small Business', 'Corporate', 'Non-Profit'],
        datasets: [{
            label: 'Members',
            data: [12, 19, 3, 5],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});



const fundraiserGoal = 10000;
const currentFunds = 6000;


const progressPercentage = Math.min((currentFunds / fundraiserGoal) * 100, 100);


const progressBar = document.getElementById("progress-bar");
const percentageText = document.getElementById("fundraiser-percentage");

progressBar.style.width = progressPercentage + "%";
percentageText.textContent = Math.floor(progressPercentage) + "%";




const popup = document.getElementById("popup");
const popupMessage = document.getElementById("popup-message");
const closeButton = document.getElementById("close-popup");


const lastVisit = localStorage.getItem("lastVisit");
const currentDate = new Date();

if (!lastVisit) {

    popupMessage.textContent = "Welcome! Let us know if you have any questions.";
} else {
    const lastVisitDate = new Date(lastVisit);
    const timeDifference = currentDate - lastVisitDate;
    const daysDifference = Math.floor(timeDifference / (1000 * 3600 * 24));

    if (daysDifference < 1) {

        popupMessage.textContent = "Back so soon! Awesome!";
    } else {

        const dayWord = daysDifference === 1 ? "day" : "days";
        popupMessage.textContent = `You last visited ${daysDifference} ${dayWord} ago.`;
    }
}


popup.classList.remove("hidden");


localStorage.setItem("lastVisit", currentDate.toISOString());


closeButton.addEventListener("click", () => {
    popup.classList.add("hidden");
});