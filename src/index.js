import './sass/main.scss';
import fetchCountries from './js/fetchCountries';
import debounce from 'lodash.debounce';
import { alert, notice, info, success, error } from '@pnotify/core';
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';
import countryCard from './templates/country-markup.hbs';
import countriesList from './templates/countries-list-markup.hbs';

const refs = {
  input: document.querySelector('#search'),
  countries: document.querySelector('.countries')
};

refs.input.addEventListener('input', debounce(onSearchInput, 500));

function onSearchInput() {
  refs.countries.innerHTML = '';
  const searchQuery = refs.input.value.trim()
  fetchCountries(searchQuery).then(countries => renderCountries(countries)).catch(err => info({text: 'Please enter you request correctly!', delay: 3000}))
  
};
function renderCountries(data) {
  if (data.length > 10) {
    alert({
      text: "To many matches found.Please enter a more specific query!",
      delay: 2000,
    })
    }
    if (data.length >= 2 && data.length <= 10) {
     refs.countries.insertAdjacentHTML('beforeend', countriesList(data))
    }
    if (data.length === 1) {
      refs.countries.insertAdjacentHTML('beforeend', countryCard(data))
    }
};
