init();

function init() {
    fillBirthMonthSelect();
    retrievePersonFromLocalStorage();
}

function fillBirthMonthSelect() {
    const months = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];

    // Remplissage du champs "Mois de naissance" à l'aide du tableau ci-dessus
    for (let i = 0; i < months.length; i++) {
        const option = new Option(months[i], i);
        const birthMonth = document.getElementById('birthMonth');
        birthMonth.add(option);
    }
}

function retrievePersonFromLocalStorage() {
    if (localStorage.getItem('person')) {
        const person = JSON.parse(localStorage.getItem('person'));

        document.querySelector(`input[name="civility"][value="${person.civility.id}"]`).checked = true; // Renseigner la civilité        
        document.getElementById('name').value = person.name; // Renseigner le nom        
        document.getElementById('firstName').value = person.firstName; // Renseigner le prénom

        // Renseigner la date de naissance
        const dateOfBirth = new Date(person.dateOfBirth);
        document.getElementById('birthDay').value = dateOfBirth.getDate(); // getDate renvoi le numéro du jour dans le mois (1-31). getDay renvoi le numéro du jour de la semaine (0-6)
        document.getElementById('birthMonth').value = dateOfBirth.getMonth();
        document.getElementById('birthYear').value = dateOfBirth.getFullYear(); // getYear renvoi l'année sur 2 chiffres. getFullYear renvoi l'année sur 4 chiffres
    }
}

function verif() {
    const person = createPerson();
    displayPerson(person);
    savePersonInLocalStorage(person);
}

function createPerson() {
    // Récupération de la civilité
    const civilityInput = document.querySelector('input[name="civility"]:checked');
    const civilityId = civilityInput.value;
    const civilityLabel = civilityInput.labels[0].innerText; // Récupération du label

    // Récupération du nom et du prénom
    const name = document.getElementById('name').value;
    const firstName = document.getElementById('firstName').value;

    // Récupération de la date de naissance
    const birthDay = document.getElementById('birthDay').value;
    const birthMonth = document.getElementById('birthMonth').value;
    const birthYear = document.getElementById('birthYear').value;

    const dateOfBirth = new Date(birthYear, birthMonth, birthDay);

    const person = {
        civility: {
            id: civilityId,
            label: civilityLabel
        },
        name,
        firstName,
        dateOfBirth
    };

    return person;
}

function displayPerson(person) {
    const message = document.getElementById('message');
    message.innerHTML = `Bonjour <strong>${person.civility.label} ${person.name} ${person.firstName}</strong>`;
}

function savePersonInLocalStorage(person) {
    localStorage.setItem('person', JSON.stringify(person));
}

function isNumber(input) {
    if (isNaN(input.value)) {
        input.value = null;
    }
}

function isDay(input) {
    isNumber(input);

    if (input.value < 1 || input.value > 31) {
        input.value = null;
    }
}