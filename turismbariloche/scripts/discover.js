let d = new Date();
document.getElementById("currentYear").innerHTML = `&copy; ${d.getFullYear()}`;
document.querySelector("#lastModified").textContent = `Last Modification: ${document.lastModified}`;


// Wait until the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menu-toggle');
    const mainMenu = document.getElementById('main-menu');

    // Toggle the "show" class on the menu when the button is clicked
    menuToggle.addEventListener('click', () => {
        mainMenu.classList.toggle('show'); // Add or remove the "show" class
    });
});


// Lazy Loading Images
document.addEventListener("DOMContentLoaded", () => {
    const lazyImages = document.querySelectorAll("img[data-src]");

    const loadImage = (image) => {
        image.setAttribute("src", image.getAttribute("data-src"));
        image.onload = () => {
            image.removeAttribute("data-src");
        };
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                loadImage(entry.target);
                observer.unobserve(entry.target);
            }
        });
    });

    lazyImages.forEach(image => {
        observer.observe(image);
    });
});  