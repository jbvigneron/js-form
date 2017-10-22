init();

// Initialisation de la page
function init() {
    fillBirthMonthSelect();
    retrievePersonFromLocalStorage();
}

// Afficher le texte dans le footer et sauvegarder les informations dans le localStorage
function displayAndSavePerson() {
    var person = createPerson();
    displayPerson(person);
    savePersonInLocalStorage(person);
}

/* Déclenché sur l'événement onKeyUp du champs Année
 * Vérifie que la valeur saisie est un nombre. Si ce n'est pas le cas, réinitialisation du champs
 */
function isNumber(input) {
    if (isNaN(input.value)) {
        input.value = null;
    }
}

/* Déclenché sur l'événement onKeyUp du champs Jour
 * Vérifier que la valeur saisie est un nombre et un jour (entre 1 et 31)
 */
function isDay(input) {
    isNumber(input);

    if (input.value < 1 || input.value > 31) {
        input.value = null;
    }
}

// Remplir le select des mois de naissance
function fillBirthMonthSelect() {
    var birthMonth = document.getElementById('birthMonth'); // Récupération du champs "Mois de naissance"
    var months = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];

    // Remplissage du champs "Mois de naissance" à l'aide du tableau
    for (var i = 0; i < months.length; i++) {
        var option = document.createElement("option");
        option.value = i;
        option.text = months[i];

        birthMonth.add(option);
    }
}

// Récupérer le contenu du localStorage s'il existe
function retrievePersonFromLocalStorage() {
    if (localStorage['person']) {
        var person = JSON.parse(localStorage['person']);

        document.querySelector('input[name="civility"][value="' + person.civility.id + '"]').checked = true; // Renseigner la civilité        
        document.getElementById('name').value = person.name; // Renseigner le nom        
        document.getElementById('firstName').value = person.firstName; // Renseigner le prénom

        // Renseigner la date de naissance
        var dateOfBirth = new Date(person.dateOfBirth);
        document.getElementById('birthDay').value = dateOfBirth.getDate(); // getDate renvoi le numéro du jour dans le mois (1-31). getDay renvoi le numéro du jour de la semaine (0-6)
        document.getElementById('birthMonth').value = dateOfBirth.getMonth();
        document.getElementById('birthYear').value = dateOfBirth.getFullYear(); // getYear renvoi l'année sur 2 chiffres. getFullYear renvoi l'année sur 4 chiffres
    }
}

// Créer un personne en fonction des champs de saisie
function createPerson() {
    // Récupération de la civilité
    var civilityInput = document.querySelector('input[name="civility"]:checked');
    var civilityId = civilityInput.value;
    var civilityLabel = civilityInput.labels[0].innerText; // Récupération du label

    // Récupération du nom et du prénom
    var name = document.getElementById('name').value;
    var firstName = document.getElementById('firstName').value;

    // Récupération de la date de naissance
    var birthDay = document.getElementById('birthDay').value;
    var birthMonth = document.getElementById('birthMonth').value;
    var birthYear = document.getElementById('birthYear').value;

    var dateOfBirth = new Date(birthYear, birthMonth, birthDay);

    var person = {
        civility: {
            id: civilityId,
            label: civilityLabel
        },
        name: name,
        firstName: firstName,
        dateOfBirth: dateOfBirth
    };

    return person;
}

/* Le texte affiché est : Bonjour {civilité} {nom} {prénom}
 * Exemples :
 * Bonjour Monsieur Jean Dupont
 * Bonjour Madame Claire Dubois
 */
function displayPerson(person) {
    // Récupération du div "helloText", puis affichage du texte
    var helloTextDiv = document.getElementById('helloText');

    var userLang = navigator.language || navigator.userLanguage;
    var message = '';

    if (userLang.indexOf('fr') !== -1) {
        message += 'Bonjour';
    } else {
        message += 'Hello';
    }

    message += ' <strong>' + person.civility.label + ' ' + person.name + ' ' + person.firstName + '</strong>';
    helloTextDiv.innerHTML = message;
}

// Sauvegarde les informations de la personne dans le localStorage
function savePersonInLocalStorage(person) {
    localStorage['person'] = JSON.stringify(person);
}