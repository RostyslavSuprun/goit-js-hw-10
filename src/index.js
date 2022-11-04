import './css/styles.css';
import debounce from 'lodash.debounce'
import Notiflix from 'notiflix';
const DEBOUNCE_DELAY = 300;

const inputEl = document.querySelector('#search-box')
const countryList = document.querySelector('.country-list')

function onInput() {
    if (inputEl.value !== "") {
        return fetch(`https://restcountries.com/v2/all?fields=name,capital,currencies,population,flag,languages,otherNames`).then(
            (response) => {
                if (!response.ok) {
                    throw new Error(response.status);
                }
                return response.json();
            })
    }

}



// || (inputEl.value !== null)

inputEl.addEventListener("input", debounce(() => {
    if (inputEl.value !== "") {
        onInput()
            .then((countries) => renderCountry(countries))
            .catch((error) => console.log(error));
    }
    countryList.innerHTML = ""
}, DEBOUNCE_DELAY)) ;

function renderCountry(countries) {
let array = [];
  const markup = countries
      .map((country) => {
          
          if (country.name.toLowerCase().includes(inputEl.value.toLowerCase())) {
             array.push(country)
              
              return `
          <li>
            <img src=${country.flag} alt="flag" width="60"><p>${country.name}</p>

          </li>
      `;
          }
    })
      .join("");
    // console.log(markup)
    // console.log(inputEl.value)
    // console.log(array)
    // console.log('array lenght ---', array.length)
    countryList.innerHTML = markup;
    if (array.length > 10) {
        countryList.innerHTML = ""
        array = [];
        Notiflix.Notify.info(`Too many matches found. Please enter a more specific name.`)
        return
    }
    if (array.length === 0) {
        countryList.innerHTML = ""
        array = [];
        Notiflix.Notify.failure(`Oops, there is no country with that name`)
        return
    }
    if (array.length === 1) {
        countryList.innerHTML = ""
        array = [];
        
       const newMarkup = countries
      .map((country) => {
          
          if (country.name.toLowerCase().includes(inputEl.value.toLowerCase())) {
             
              
              return `
          <li class="list-item">
            <h1>${country.name}</h1>
            <p><b>Capital</b> : ${country.capital}</p>
            <p><b>Population</b> : ${country.population}</p>
            <p><b>Flag</b> : <img src=${country.flag} alt="flag" width="90"></p>
            <p><b>languages</b> : ${country.languages.map((language) => { return language.name })}</p>
          </li>
      `;
          }
    })
      .join("");
        
        countryList.innerHTML = newMarkup;
    }  
    
}


// if (country.name.includes('input.textcontent')) {
    // console.log(countryName)
// }

// https://restcountries.com/v2/all?fields=name,capital,currencies

// /* <img src="https://res.cloudinary.com/goit-academy/image/upload/v1614773221/codepen/cat_segyum.svg" alt="Кот" width="60"></img> */