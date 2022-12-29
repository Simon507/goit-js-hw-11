import { searchRequest } from './js/search';
import SimpleLightbox from 'simplelightbox';

const searchForm = document.getElementById('search-form');
const loadBtn = document.querySelector('.load-more');
const resultsField = document.querySelector('.gallery');

let lightBox = new SimpleLightbox('.photo-card a', {
  captionsData: 'alt',
  captionDelay: 250,
  nav: true,
});

let pageNum = 1;

loadBtn.setAttribute('hidden', 'hidden');

searchForm.addEventListener('submit', onSubmit);

function onSubmit(evt) {
  evt.preventDefault();

  while (resultsField.firstChild) {
    resultsField.firstChild.remove();
  }
  // ДОБАВИТЬ ПРОВЕРКУ НА ПУСТОТУ И ПРОБЕЛЫ!!!!!

  searchRequest(pageNum);
}

function createResult(response) {
  const element = response.data.hits;
  const markUp = element.map(
    ({
      webformatURL,
      largeImageURL,
      tags,
      likes,
      views,
      comments,
      downloads,
    }) => `<div class="photo-card">
     <a href="${largeImageURL}">
     <img class="_img" src="${webformatURL}" alt="${tags}" loading="lazy">
     <div class="photo-card">
     </a>
     </div>
           <div class="info">
             <p class="info-item">
               <b>Likes: ${likes}</b>
             </p>
             <p class="info-item">
               <b>Views: ${views}</b>
             </p>
             <p class="info-item">
               <b>Comments: ${comments}</b>
            </p>
             <p class="info-item">
               <b>Downloads: ${downloads}</b>
             </p>
           </div>
         </div>`
  );
  resultsField.insertAdjacentHTML('beforeend', markUp);
  loadBtn.removeAttribute('hidden');
  lightBox.refresh();
}

loadBtn.addEventListener('click', onLoadBtnClick);

function onLoadBtnClick() {
  pageNum += 1;
  searchRequest(pageNum);
}

export { createResult };
