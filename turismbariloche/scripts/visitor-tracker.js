document.addEventListener("DOMContentLoaded", function () {
    // Get last visit from local storage
    let lastVisit = localStorage.getItem("lastVisit");

    // Get current date & time
    let now = new Date();
    let formattedDate = now.toLocaleString();

    if (lastVisit) {
        document.getElementById("lastVisit").innerText = "Last visit: " + lastVisit;
    } else {
        document.getElementById("lastVisit").innerText = "This is your first visit!";
    }

    // Store current visit in local storage
    localStorage.setItem("lastVisit", formattedDate);
});

function openModal() {
    document.getElementById("subscribeModal").style.display = "flex";
}

function closeModal() {
    document.getElementById("subscribeModal").style.display = "none";
}

let lastScrollTop = 0;
let visitorMessage = document.querySelector(".visitor-message");

window.addEventListener("scroll", function () {
    let currentScroll = window.scrollY;

    if (currentScroll > lastScrollTop) {
        // Scrolling down - hide message
        visitorMessage.style.transform = "translateY(100px)";
        visitorMessage.style.opacity = "0";
    } else {
        // Scrolling up - show message
        visitorMessage.style.transform = "translateY(0)";
        visitorMessage.style.opacity = "1";
    }

    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // Prevent negative values
}, false);