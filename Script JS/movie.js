const TOP_MOVIES_API =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";

const SEARCHAPI =
  "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

async function getMovies(api) {
  const respose = await fetch(api);
  const data = await respose.json();
  displayMovies(data.results);
}
getMovies(TOP_MOVIES_API);

const topMoviesDisp = document.querySelector(".movies-grid");

function displayMovies(movie) {
  console.log(movie);

  topMoviesDisp.innerHTML = "";
  for (let data of movie) {
    const div = document.createElement("div");
    div.classList.add("movie-card");
    topMoviesDisp.append(div);
    div.innerHTML = `<img src=${`https://image.tmdb.org/t/p/w1280${data.poster_path}`} alt=""
                    class="movie-thumb">
                <div class="movie-info">
                    <h3>${data.title}</h3>
                    <p>${data.overview}</p>
                    <span>⭐ ${data.vote_average}</span>
                </div>`;
  }
}

const input = document.querySelector("#searchInput");

input.addEventListener("keyup", (e) => {
  let value = e.target.value;
  if (value == "") {
    getMovies(TOP_MOVIES_API);
    document.querySelector("#movie-section").style.marginTop = "";
  } else {
    document.querySelector("#movie-section").style.marginTop = "0";
    getMovies(SEARCHAPI + value);
  }
});
