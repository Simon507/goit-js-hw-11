import { searchRequest } from './js/search';
import SimpleLightbox from 'simplelightbox';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const searchForm = document.getElementById('search-form');
const upBtn = document.querySelector('.upBtn');
const resultsField = document.querySelector('.gallery');
const guard = document.querySelector('.js-guard');

const options = {
  root: null,
  rootMargin: '100px',
  threshold: 1.0,
};

const observer = new IntersectionObserver(onInfinityLoad, options);

let lightBox = new SimpleLightbox('.photo-card a', {
  captionsData: 'alt',
  captionDelay: 500,
  nav: true,
});

let pageNum = 1;

upBtn.setAttribute('hidden', 'hidden');

searchForm.addEventListener('submit', onSubmit);

function onSubmit(evt) {
  evt.preventDefault();

  while (resultsField.firstChild) {
    resultsField.firstChild.remove();
  }
  searchRequest(pageNum);
}

function createResult(response) {
  const element = response.data.hits;
  const maxPage = Math.trunc(response.data.totalHits / 40) + 1;
  const markUp = element
    .map(
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
      </a>
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
    )
    .join('');
  resultsField.insertAdjacentHTML('beforeend', markUp);
  lightBox.refresh();

  if (pageNum === 1) {
    Notify.success(`Hooray! We found ${response.data.totalHits} images.`);
  }
  if (pageNum > 2) {
    upBtn.removeAttribute('hidden');
  }
  if (pageNum <= maxPage) {
    observer.observe(guard);
  } else {
    observer.unobserve(guard);
  }
}

function onInfinityLoad(entries, observer) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      pageNum += 1;
      searchRequest(pageNum);
    }
  });
}

export { createResult };
