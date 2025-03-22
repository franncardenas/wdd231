fetch('./data/members.json')
    .then(response => response.json())
    .then(data => {
        const companies = data.companies;
        const memberCardsSection = document.querySelector('.member-cards');

        memberCardsSection.innerHTML = '';

        for (const companyName in companies) {
            const company = companies[companyName];

            const card = document.createElement('div');
            card.classList.add('card');

            const logo = document.createElement('img');
            logo.classList.add('company-logo');
            logo.src = company.imageFileName;
            logo.alt = `${companyName} photo or logo`;

            const name = document.createElement('p');
            name.classList.add('company-name');
            name.textContent = companyName;

            const address = document.createElement('p');
            address.classList.add('address');
            address.textContent = company.address;

            const phoneNumber = document.createElement('p');
            phoneNumber.classList.add('phone-number');
            phoneNumber.textContent = company.phoneNumber;

            const websiteLink = document.createElement('a');
            websiteLink.classList.add('company-page');
            websiteLink.href = company.website;
            websiteLink.textContent = company.website;
            websiteLink.target = '_blank';

            card.appendChild(logo);
            card.appendChild(name);
            card.appendChild(address);
            card.appendChild(phoneNumber);
            card.appendChild(websiteLink);

            memberCardsSection.appendChild(card);
        }
    })

const gridViewButton = document.getElementById('grid-view');
const listViewButton = document.getElementById('list-view');

const memberCardsSection = document.querySelector('.member-cards')

gridViewButton.addEventListener('click', () => {
    memberCardsSection.classList.add('grid-view');
    memberCardsSection.classList.remove('list-view');

});

listViewButton.addEventListener('click', () => {
    memberCardsSection.classList.add('list-view');
    memberCardsSection.classList.remove('grid-view');
})

const currentYear = new Date().getFullYear();
document.getElementById('currentyear').textContent = currentYear;

const lastModified = document.lastModified;
document.getElementById('lastModified').textContent = `Last Modified: ${lastModified}`;