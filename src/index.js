import './css/styles.css';
import {fetchCountries} from "./fetchCountries";
import Notiflix from 'notiflix';
var debounce = require('lodash.debounce');

const DEBOUNCE_DELAY = 300;

const refs = {
    inputAct: document.querySelector('#search-box'),
    countryList: document.querySelector('.country-list'),
    countryInfo: document.querySelector('.country-info'),
};

refs.inputAct.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));


function onSearch(e) {
    e.preventDefault();
    const nameCountry = refs.inputAct.value.trim();
    if (!nameCountry) {
        refs.countryList.innerHTML = ''; refs.countryInfo.innerHTML = '';
        return;
    }

    fetchCountries(nameCountry)
    .then(onCountry)
        .catch(onError)
}

function onCountry(countries) {

    refs.countryList.innerHTML = '';
    refs.countryInfo.innerHTML = '';

    if (countries.length > 10) {
        Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
    }


    if (countries.length > 2 && countries.length < 10) {
        const list = countries.map(({ flags, name }) => {
            return `<li class="country-list__item"><img src="${flags.svg}" alt="" width="50" height="50"><h2 class="country-list__title">${name.official}</h2></li>`
        }).join('');
        refs.countryList.innerHTML = list;
    }

    if (countries.length === 1) {
      const markup = countries.map(({ flags, name, capital, population, languages}) => {
          return `<div>
            <img  src="${flags.svg}" alt="${name.official}" width="70" height="50">
            <h2>${name.official}</h2>
            <p>Capital: ${capital}</p>
            <p>Population: ${population}</p>
            <p>Languages: ${Object.values(languages)}</p>
            </div>`
      }).join('');
      refs.countryInfo.innerHTML = markup;  
    } 
}
function onError() { 
    Notiflix.Notify.failure('Oops, there is no country with that name.');
}



 