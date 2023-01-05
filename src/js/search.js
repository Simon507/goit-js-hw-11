import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { createResult } from '../index';

const inputField = document.querySelector('input[name="searchQuery"]');
const axios = require('axios').default;

async function searchRequest(pageNum) {
  let searchTarget = inputField.value;

  if (!searchTarget) {
    Notify.failure(`Please enter you request...`);
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

    if (response.data.totalHits === 0) {
      Notify.failure(
        `Sorry, there are no images matching your search query. Please try again.`
      );
    } else {
      createResult(response);
      observer.observe(guard);
    }
  } catch (error) {
    if (error.code === 'ERR_BAD_REQUEST') {
      Notify.warning(`
           Sorry, in this version it is not possible to display more than 500 pictures.`);
    }
  }
}

export { searchRequest };
