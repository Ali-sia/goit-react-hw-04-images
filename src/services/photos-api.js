// const fetchPhotosAPI = async (searchQuery, page) => {
//   const API_KEY = '13420675-ac3576debf8258c428cd202e5';

//   const apiFetch = await fetch(
//     `https://pixabay.com/api/?q=${searchQuery}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
//   );
//   const response = await apiFetch.json();
//   const { hits } = response;

//   return hits;
// };

// export default fetchPhotosAPI;

export default function fetchPhotosAPI(searchQuery, page) {
  const API_KEY = '13420675-ac3576debf8258c428cd202e5';
  return fetch(
    `https://pixabay.com/api/?q=${searchQuery}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  )
    .then(responce => {
      if (responce.ok) {
        return responce.json();
      }
      return Promise.reject(
        new Error(`Cant find anithing by your query ${searchQuery}`)
      );
    })
    .then(responce => {
      return responce;
    });
}
