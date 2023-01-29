import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;


const searchInput = document.querySelector('#search-box');
const countryEl = document.querySelector('.country-info');
const countriesListEl = document.querySelector('.country-list');


searchInput.addEventListener('input', debounce(onInputEnter, DEBOUNCE_DELAY));

function onInputEnter(e) {
    const inputValue = (e.target.value).trim();
    if(!inputValue) {
        clearMarkup();
        return;
    };
    fetchCountries(inputValue)
    .then(countries => {
        clearMarkup();
        if (countries.length > 10) {
            return Notify.info("Too many matches found. Please enter a more specific name.");
        } else if (countries.length >= 2 && countries.length <= 10) {
            return countries.map(renderMarkupItem);
        } else if (countries.length === 1) {
            return renderMarkupDiv(countries);
        }
    })
    .catch((error) => {
        showError(error);
        clearMarkup();
     })
    };

function renderMarkupDiv(countries) {
    return countries.map((country) => {
        const { 
                name, 
                capital, 
                population, 
                flags, 
                languages 
            } = country;
        const languagesStr = Object.values(languages).join(', ');

        return countryEl.innerHTML = 
            `<div class="header-wrapper">
                <img src="${flags.svg}" alt="${name.official}" width="40" height="27">
                <h1>${name.official}</h1>
                </div>
                <p><span class="accent">Capital:</span> ${capital}</p>
                <p><span class="accent">Population:</span> ${population}</p>
                <p><span class="accent">Languages:</span> ${languagesStr}</p>`
        });   
}


function renderMarkupItem(country) {
    const { 
            name,  
            flags,  
        } = country;
    const markup = `<li><img src="${flags.svg}" alt="${name.official}" width="40" height="25"><span>${name.official}</span></li>`;
    return countriesListEl.insertAdjacentHTML("beforeend", markup); 
    
}

function clearMarkup() {
    countryEl.innerHTML = '';
    countriesListEl.innerHTML = '';
}

function showError(error) {
    // Notify.failure(`${error}`, {
    //     timeout: 1200,
    // });
     Notify.failure('Oops, there is no country with that name');
}