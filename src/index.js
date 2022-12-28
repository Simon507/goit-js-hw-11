import { searchRequest } from './js/search';
import SimpleLightbox from 'simplelightbox';

const searchForm = document.getElementById('search-form');
const loadBtn = document.querySelector('.load-more');
const resultsField = document.querySelector('.gallery');

// const lightBox = new SimpleLightbox('.photo-card a', {
//   captionsData: 'alt',
//   captionDelay: 250,
//   nav: true,
// });

let pageNum = 1;

loadBtn.setAttribute('hidden', 'hidden');

searchForm.addEventListener('submit', onSubmit);

function onSubmit(evt) {
  evt.preventDefault();
  // alert('click!');

  // ДОБАВИТЬ ПРОВЕРКУ НА ПУСТОТУ И ПРОБЕЛЫ!!!!!

  searchRequest(pageNum);
}

function createResult(response) {
  const element = response.data.hits;
  for (let i = 0; i < element.length; i += 1) {
    const newItem = `
    <div class="photo-card">
    <a href="${element[i].largeImageURL}">
    <img class="_img" src="${element[i].webformatURL}" alt="${element[i].tags}" loading="lazy">
    </a>
    </div>
          <div class="info">
            <p class="info-item">
              <b>Likes</b>
            </p>
            <p class="info-item">
              <b>Views</b>
            </p>
            <p class="info-item">
              <b>Comments</b>
            </p>
            <p class="info-item">
              <b>Downloads</b>
            </p>
          </div>
        </div>`;

    resultsField.insertAdjacentHTML('beforeend', newItem);

    loadBtn.removeAttribute('hidden');
  }
}

loadBtn.addEventListener('click', onLoadBtnClick);

function onLoadBtnClick() {
  pageNum += 1;
  searchRequest(pageNum);
}

resultsField.addEventListener('click', onResultClick);

function onResultClick(evt) {
  console.log(evt.target);
  evt.preventDefault();

  // lightBox;

  const lightBox = new SimpleLightbox('.photo-card a', {
    captionsData: 'alt',
    captionDelay: 250,
  });
}

export { createResult };
