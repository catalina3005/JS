// const API_KEY = '3882b622a44d3f797133149bd9fabefb';
// const BASE_URL = 'https://api.themoviedb.org/3';
// const API_URL = BASE_URL + 'movie/550?api_key=3882b622a44d3f797133149bd9fabefb'
// +API_KEY;
const select = document.getElementById("dropdown-menu");
let movies;
let currentPage = 1;
let numberOfPages = 1;

window.onload = function () {
  link =
    "https://api.themoviedb.org/3/discover/movie?api_key=3882b622a44d3f797133149bd9fabefb&query=m&year=2022&page=";
  validateEachPage(1);
  displayGenres();
  select.addEventListener("click", getMovieByGenre);
};

function displayGenres() {
  fetch(
    "https://api.themoviedb.org/3/genre/movie/list?api_key=3882b622a44d3f797133149bd9fabefb&language=en-US"
  )
    .then((response) => response.json())
    .then((data) => {
      data.genres.forEach((genre) => render(genre));
    });
}

function render(genre) {
  const item = document.createElement("option");
  item.value = genre.id;
  const content = document.createTextNode(`${genre.name}`);
  item.appendChild(content);
  item.setAttribute("value", genre.name);
  item.setAttribute("id", genre.id);
  select.appendChild(item);
}

function getMovieByGenre(e) {
  link =
    "https://api.themoviedb.org/3/discover/movie?api_key=3882b622a44d3f797133149bd9fabefb&query=m&with_genres=" +
    e.target.id +
    "&page=";
  console.log(link);
  let title = document.getElementById("titlePage");
  title.innerHTML = e.target.innerHTML + " Movies";
  currentPage = 1;
  validateEachPage(1);
}

function getPereviousPage() {
  if (currentPage > 1) {
    currentPage--;
    validateEachPage(currentPage);
  }
}

function getNextPage() {
  if (currentPage < numberOfPages) {
    currentPage++;
    validateEachPage(currentPage);
  }
}

function validateEachPage(paginationPage) {
  var paginationPage_span = document.getElementById("paginationNumber");
  if (paginationPage < 1) paginationPage = 1;
  if (paginationPage > numberOfPages) paginationPage = numberOfPages;
  console.log(link + paginationPage);
  getCards(link + paginationPage);
  console.log(paginationPage);
  paginationPage_span.innerHTML = paginationPage;
}

function getCards(link) {
  if (document.getElementById("moviesList").innerHTML != "") {
    document.getElementById("moviesList").innerHTML = "";
  }
  fetch(link)
    .then((response) => response.json())
    .then((movies) => {
      console.log(movies, "movies");
      for (movieDetails in movies.results) {
        document.getElementById("moviesList").innerHTML += createCard(
          movies.results[movieDetails]
        );
      }
      numberOfPages = movies.total_pages;
      console.log(numberOfPages, "no of pages");
    });
}
function createCard(movie) {
  return `<div class="card col-3" style="width:400px">
            <img class="card-img-top" src="https://image.tmdb.org/t/p/original/${movie.poster_path}" alt="Card image" style="width:100%">
            <div class="card-body">
              <h4 class="card-title">
              </h4>
                <p id="first-p-in-cards">${movie.title}</p>
              <p> Language: ${movie.original_language}
              </p>
              <p class="card-text">${movie.overview}</p>
              <p>Release date: ${movie.release_date}</p>
            </div>
          </div>`;
}

getMovies();

document
  .getElementById("btn-trending")
  .addEventListener("click", displayTrendingMovies);

function displayTrendingMovies() {
  let title = document.getElementById("titlePage");
  title.innerHTML = "Trending";
  link =
    "https://api.themoviedb.org/3/trending/movie/week?api_key=3882b622a44d3f797133149bd9fabefb&page=";
  currentPage = 1;
  validateEachPage(1);
  card.paginationPage_span();
}

function getMovies() {
  let movies;
  fetch(
    "https://api.themoviedb.org/3/discover/movie?api_key=3882b622a44d3f797133149bd9fabefb"
  )
    .then((response) => response.json())
    .then((movies) => {
      console.log(movies);
      for (let movie of movies.results) {
        console.log(movie);
        document.getElementById("group").innerHTML += createCard(movie);
      }
    });
}
