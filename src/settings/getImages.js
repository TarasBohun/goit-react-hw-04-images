const BASE_URL = 'https://pixabay.com/api/?';
const API_KEY = '32774194-792e23631cb879969b998331a';
const PER_PAGE = '12';

export const getImages = (searchText, page) => {
  return fetch(
    `${BASE_URL}q=${searchText}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${PER_PAGE}`
  );
};
