import { createResult } from '../index';

const inputField = document.querySelector('input[name="searchQuery"]');

function searchRequest() {
  let searchTarget = inputField.value;
  //   console.log(`searching........... ${searchTarget}`);

  if (!searchTarget) {
    alert(`add text!!!`);
    return;
  }

  fetch(
    `https://pixabay.com/api/?key=32355141-118a8dcb9c7f98144e9365121&q=${searchTarget}`
  )
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then(data => {
      //   console.log(data);
      //   console.log(data.hits);

      createResult(data);

      //   if (data.length > 10) {
      //     Notify.warning(
      //       `Too many matches found. Please enter a more specific name.`
      //     );
      //   } else if (data.length > 1) {
      //     makeUpCountryList(data);
      //   } else {
      //     makeUpCountryCard(data);
      //   }
    })
    .catch(error => {
      if (error.message == '404') {
        Notify.failure(`Oops, there is no country with that name`);
      }
    });
}

export { searchRequest };
