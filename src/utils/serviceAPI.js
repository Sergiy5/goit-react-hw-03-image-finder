export const FetchAPI = (query, page) => {
  const KEY_API = '34644212-a58abb2fa8dd8599bef437aea';
  const BASE_URL = 'https://pixabay.com/api/'
  const PAGE = page;
  const PER_PAGE = "12"
     return fetch(
       `${BASE_URL}?key=${KEY_API}&q=${query}&page=${PAGE}&per_page=${PER_PAGE}&image_type=photo&orientation=horizontal`
     ).then(response => {
       if (response.ok) {
         return response.json();
       }
       return Promise.reject(
         new Error(`За запитом ${query} нічого не знайдено`)
       );
     });
}