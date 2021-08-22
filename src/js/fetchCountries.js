const URL = 'https://restcountries.eu/rest/v2';
export default function fetchCountries(searchQuery) {
 return fetch(`${URL}/name/${searchQuery}`).then(response=> {
    if (!response.ok) {
      console.log('Не корректные данные');
      throw response;
   }
    return response.json();
  })
}
