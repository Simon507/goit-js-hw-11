!function(){var n=document.querySelector('input[name="searchQuery"]');function e(){var e=n.value;e?fetch("https://pixabay.com/api/?key=32355141-118a8dcb9c7f98144e9365121&q=".concat(e)).then((function(n){if(!n.ok)throw new Error(n.status);return n.json()})).then((function(n){a(n)})).catch((function(n){"404"==n.message&&Notify.failure("Oops, there is no country with that name")})):alert("add text!!!")}var t=document.getElementById("search-form"),o=document.querySelector(".gallery");function a(n){console.log(n);for(var e=0;e<=n.total;e+=1){var t='<div class="photo-card">\n          <img src="'.concat(n.hits[e].previewURL,'" alt="" loading="lazy" />\n          <div class="info">\n            <p class="info-item">\n              <b>Likes</b>\n            </p>\n            <p class="info-item">\n              <b>Views</b>\n            </p>\n            <p class="info-item">\n              <b>Comments</b>\n            </p>\n            <p class="info-item">\n              <b>Downloads</b>\n            </p>\n          </div>\n        </div>');o.insertAdjacentHTML("beforeend",t)}}t.addEventListener("submit",(function(n){n.preventDefault(),e()}))}();
//# sourceMappingURL=index.452fb81c.js.map
