document.addEventListener("DOMContentLoaded", function () {
    const container = document.getElementById("members-container");

    // Fetch attractions from data/attractions.json
    fetch("data/attractions.json")
        .then(response => response.json())
        .then(attractions => {
            populateAttractions(attractions);
        })
        .catch(error => console.error("Error fetching attractions:", error));

    // Function to populate the attractions
    function populateAttractions(attractions) {
        container.innerHTML = ""; // Clear previous content

        attractions.forEach(attraction => {
            const card = document.createElement("div");
            card.classList.add("card");

            const img = document.createElement("img");
            img.setAttribute("data-src", attraction.image_url);
            img.setAttribute("alt", attraction.title);

            const title = document.createElement("h3");
            title.textContent = attraction.title;

            const desc = document.createElement("p");
            desc.textContent = attraction.description;

            const location = document.createElement("p");
            location.innerHTML = `<b>Location:</b> ${attraction.location}`;

            const distance = document.createElement("p");
            distance.innerHTML = `<b>Distance from Center:</b> ${attraction.distance_km_from_center} km`;

            const date = document.createElement("p");
            date.innerHTML = `<b>Date:</b> ${attraction.date}`;

            card.appendChild(img);
            card.appendChild(title);
            card.appendChild(desc);
            card.appendChild(location);
            card.appendChild(distance);
            card.appendChild(date);

            container.appendChild(card);
        });

        lazyLoadImages();
    }

    // Lazy load images using Intersection Observer
    function lazyLoadImages() {
        const images = document.querySelectorAll("img[data-src]");

        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.getAttribute("data-src");
                    img.removeAttribute("data-src");
                    img.style.opacity = "1";
                    observer.unobserve(img);
                }
            });
        }, { threshold: 0.1 });

        images.forEach(img => observer.observe(img));
    }

    // Toggle between grid and list views
    document.getElementById("grid").addEventListener("click", function () {
        container.classList.remove("list");
        container.classList.add("grid");
    });

    document.getElementById("list").addEventListener("click", function () {
        container.classList.remove("grid");
        container.classList.add("list");
    });
});