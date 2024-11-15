const regionSelect = document.getElementById('region');
const countriesList = document.getElementById('countries-list');
const nameElement = document.getElementById('name');
const populationElement = document.getElementById('population');
const currenciesElement = document.getElementById('currencies');
const languagesElement = document.getElementById('languages');
const flagElement = document.getElementById('flag');

// Función para obtener países según la región seleccionada
async function getCountries() {
    const region = regionSelect.value;
    try {
        const response = await fetch(`http://localhost:3000/countries/${region}`);
        const countries = await response.json();
        displayCountries(countries);
    } catch (error) {
        console.error('Error al obtener países:', error);
    }
}

// Función para mostrar el listado de países
function displayCountries(countries) {
    countriesList.innerHTML = '';
    countries.forEach(country => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `<img src="${country.flag}" alt="Flag" width="20"> ${country.name}`;
        listItem.onclick = () => showCountryDetails(country.name);
        countriesList.appendChild(listItem);
    });
}

// Función para mostrar los detalles del país
async function showCountryDetails(countryName) {
    try {
        const response = await fetch(`http://localhost:3000/country/${countryName}`);
        const country = await response.json();
        displayCountryDetails(country);
    } catch (error) {
        console.error('Error al obtener detalles del país:', error);
    }
}

// Función para mostrar los detalles del país
function displayCountryDetails(country) {
    nameElement.textContent = `Nombre: ${country.name}`;
    populationElement.textContent = `Población: ${country.population}`;
    currenciesElement.textContent = `Monedas: ${country.currencies.join(', ')}`;
    languagesElement.textContent = `Idiomas: ${country.languages.join(', ')}`;
    flagElement.src = country.flag;
}
