import { createResult } from '../index';

const inputField = document.querySelector('input[name="searchQuery"]');
const axios = require('axios').default;

async function searchRequest(pageNum) {
  let searchTarget = inputField.value;

  if (!searchTarget) {
    alert(`add text!!!`); //  Сделать всплывашку
    return;
  }

  try {
    const response = await axios.get(`https://pixabay.com/api/?`, {
      params: {
        key: '32355141-118a8dcb9c7f98144e9365121',
        q: `${searchTarget}`,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true',
        page: pageNum,
        per_page: '40',
      },
    });

    createResult(response);
  } catch (error) {
    console.error(error);
    //!!!!!!!!!!!!!!!!!!!!! сделать всплывашку
  }
}

export { searchRequest };
