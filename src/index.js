import { searchRequest } from './js/search';
import SimpleLightbox from 'simplelightbox';

const searchForm = document.getElementById('search-form');
const loadBtn = document.querySelector('.load-more');
const resultsField = document.querySelector('.gallery');
let resp;
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
  // console.log(response);
  const element = response.data.hits;
  for (let i = 0; i < element.length; i += 1) {
    // console.log(element[i]);
    const newItem = `<div class="photo-card">
    <a href="${element[i].largeImageURL}">
    <img class="_img" src="${element[i].webformatURL}" alt="${element[i].tags}" loading="lazy" />
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

  // function onResultClick(evt, response) {
  //   evt.preventDefault();
  //   console.log(response);
  //   // const element = response.data.hits;
  //   // var lightBox = new SimpleLightbox('.photo-card img', {
  //   //   sourceAttr: element.largeImageURL,
  //   //   captionsData: 'alt',
  //   //   captionDelay: 250,
  //   // });
  // }
  // resp = response;
  // return resp;
}

loadBtn.addEventListener('click', onLoadBtnClick);

function onLoadBtnClick() {
  pageNum += 1;
  searchRequest(pageNum);
}

resultsField.addEventListener('click', onResultClick);

function onResultClick(evt) {
  evt.preventDefault();
  // console.dir(resp);

  console.log(evt.target.src);

  // const element = response.data.hits;
  var lightBox = new SimpleLightbox('.photo-card a', {
    // sourceAttr: evt.target.src,
    // captionsData: 'alt',
    // captionDelay: 250,
  });
}

export { createResult };
