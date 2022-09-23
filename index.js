const url = 'https://randomuser.me/api/?nat=UA&results=15';

const sectionDating = document.querySelector('.section-dating');
const sectionUsers = document.querySelector('.section-users');
const findBtn = document.querySelector('.find-btn');
const sortByAge = document.querySelector('.sortByAge');
const sortByGender = document.querySelector('.sortByGender');
const search = document.querySelector('.search-field');

function getUserCardHTMLCode({media, name, gender, age, email, phone}) {
    return `
        <img class="imageUser" src="${media}" alt="avatar">
        <div class="title-age details">
            <img class="details-icon" src="./icon/name.png" alt="name">
            <p class="details-content">${name}, ${age}</p>
        </div>
        <div class="gender details">
            <img class="details-icon" src="./icon/sex.png" alt="gender">
            <p class="details-content">${gender}</p>
        </div>
        <div class="email details">
            <img class="details-icon" src="./icon/email.png" alt="email">
            <p class="details-content">${email}</p>
        </div>
        <div class="phone details">
            <img class="details-icon" src="./icon/call.png" alt="phone">
            <p class="details-content">${phone}</p>
        </div>
    `;
}

function getUserFromRandomUserAPI (randomUser) {
    return {
        name: `${randomUser.name.first} ${randomUser.name.last}`,
        media: randomUser.picture.large,
        gender: randomUser.gender,
        age: randomUser.dob.age,
        email: randomUser.email,
        phone: randomUser.phone
    }
}

async function fetchRandomUsers() {
    const response = await fetch(url);
    const data = await response.json();
    const randomUsers = data.results;
    return randomUsers.map(getUserFromRandomUserAPI);
}

function renderUserCards(users) {
    users.forEach(user => {
        const html = getUserCardHTMLCode(user);

        const card = document.createElement('div');
        card.className = 'user';
        card.innerHTML = html;

        sectionUsers.append(card);
    });    
}

async function init() {
    const users = await fetchRandomUsers();
    renderUserCards(users);
}

findBtn.onclick = () => {
    sectionDating.classList.add('active');
    sectionDating.scrollIntoView({behavior: 'smooth'});
    init();
}
