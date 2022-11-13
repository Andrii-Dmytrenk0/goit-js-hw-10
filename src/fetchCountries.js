export { fetchCountries };

function fetchCountries(nameCountry) {
  return fetch(`https://restcountries.com/v3.1/name/${nameCountry}`).then(response => {
    if (response.status !== 200) {
      throw new Error(response.status);;
    } 
    return response.json();
  });
}