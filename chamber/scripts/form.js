const now = new Date();
const timestamp = now.toISOString();
console.log("Timestamp set: ", timestamp);

document.getElementById('timestamp').value = timestamp;


function openModal(modalId) {
    document.getElementById(modalId).style.display = "block";
}


function closeModal(modalId) {
    document.getElementById(modalId).style.display = "none";
}


document.getElementById('np-membership').addEventListener('click', function () {
    openModal('np-modal');
});

document.getElementById('bronze-membership').addEventListener('click', function () {
    openModal('bronze-modal');
});

document.getElementById('silver-membership').addEventListener('click', function () {
    openModal('silver-modal');
});

document.getElementById('gold-membership').addEventListener('click', function () {
    openModal('gold-modal');
});


document.querySelectorAll('.close').forEach(function (closeButton) {
    closeButton.addEventListener('click', function () {
        const modalId = this.getAttribute('data-close');
        closeModal(modalId);
    });
});


window.addEventListener('click', function (event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = "none";
    }
});