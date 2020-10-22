//https://api.themoviedb.org/3/movie/now_playing?api_key=5c0031cbea7d17ffd85179ff73708a8a&language=en-US&page=1
const URL_PATH = "https://api.themoviedb.org";
const API_KEY = "5c0031cbea7d17ffd85179ff73708a8a";

document.addEventListener("DOMContentLoaded", () => {
    renderNewsMovies();
    renderPopularMovies();
    renderTopMovies();
})

const getNewsMovies = () => {
const url = `${URL_PATH}/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`

    return fetch(url)
        .then(response => response.json())
        .then(result => result.results)
        .catch(error => console.log(error))
}

const renderNewsMovies = async () => {
const newMovies = await getNewsMovies();

    html = '';

    newMovies.forEach((movie, index) => {
        const {id, title, overview,backdrop_path} = movie;
        const urlImage = `https://image.tmdb.org/t/p/original${backdrop_path}`;
        const urlMovie = `../movie.html?id=${id}`;
        html +=`
        <div class="carousel-item  ${index === 0 ? "active" : null}" style="background-image: url('${urlImage}')">
            <div class = "carousel-caption">
                <h5>${title}</h5>
                <p>${overview}</p>
                <a href = "${urlMovie}" class = "btn btn-primary">More Information</a>
            </div>
        </div>
        `
    });

    html += `
    
    <a class="carousel-control-prev" href="#carousel-news-movies" role="button" data-slide="prev">
     <span class="carousel-control-prev-icon" aria-hidden="true"></span>
     <span class="sr-only">Previous</span>
    </a>
     <a class="carousel-control-next" href="#carousel-news-movies" role="button" data-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
     <span class="sr-only">Next</span>
     </a>

    `;


    document.getElementsByClassName('list-news-movies')[0].innerHTML = html;

}

const getPopularMovies = () => {
    const url = `${URL_PATH}/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`;

    return fetch(url)
    .then(response => response.json())
    .then(result => result.results)
    .catch(error => console.log(error))
}

const renderPopularMovies = async () => {
    const movies = await getPopularMovies();
    let html = "";
    movies.forEach((movie, index) => {
        const {id, title, poster_path} = movie;
        const movieCover = `https://image.tmdb.org/t/p/original${poster_path}`;
        const urlMovie = `../movie.html?id=${id}`;

        if(index < 5){
            html += `
            <li class = "list-group-item">
                <img src = "${movieCover}" alt="${title}">
                <h3>${title}</h3>
                <a href="${urlMovie}" class= "btn btn-primary">More</a>
            </li>
            `;
        }
        document.getElementsByClassName('now-playing__list')[0].innerHTML = html;

    })
}

const getTopMovies = () => {
    const url = `${URL_PATH}/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`;
    
    return fetch(url)
    .then(response => response.json())
    .then(result => result.results)
    .catch(error => console.log(error))
}

const renderTopMovies = async () => {
    const movies = await getTopMovies();
    let html = "";
    movies.forEach((movie, index) => {
        const {id, title, poster_path} = movie;
        const movieCover = `https://image.tmdb.org/t/p/original${poster_path}`;
        const urlMovie = `../movie.html?id=${id}`;

        if(index < 5){
            html += `
            <li class = "list-group-item">
                <img src = "${movieCover}" alt="${title}">
                <h3>${title}</h3>
                <a href="${urlMovie}" class= "btn btn-primary">More</a>
            </li>
            `;
        }
        document.getElementsByClassName('now-top__list')[0].innerHTML = html;

    })
}