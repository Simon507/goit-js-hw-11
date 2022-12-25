import { searchRequest } from './js/search';

const searchForm = document.getElementById('search-form');

// const searchBtn = document.querySelector('.search-btn');

const resultsField = document.querySelector('.gallery');

searchForm.addEventListener('submit', onSubmit);

function onSubmit(evt) {
  evt.preventDefault();
  // alert('click!');

  // ДОБАВИТЬ ПРОВЕРКУ НА ПУСТОТУ И ПРОБЕЛЫ!!!!!

  searchRequest();
}

function createResult(data) {
  console.log(data);

  for (let i = 0; i <= data.total; i += 1) {
    // console.log(data.hits[i].pageURL);
    const newItem = `<div class="photo-card">
          <img src="${data.hits[i].previewURL}" alt="" loading="lazy" />
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
  }
}

export { createResult };
