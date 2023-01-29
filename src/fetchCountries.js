
const BASE_URL = 'https://restcountries.com/v3.1/name';

function fetchCountries(inputValue) {
  return fetch(`${BASE_URL}/${inputValue}?fields=name,capital,population,flags,languages`)
    .then(response => {
      if (!response.ok) {
        // throw new Error('Oops, there is no country with that name!');
        throw new Error(response.status);
      }
      return response.json();
    });

}

export { fetchCountries };
