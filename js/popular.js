const URL_PATH = "https://api.themoviedb.org";
const API_KEY = "5c0031cbea7d17ffd85179ff73708a8a";

document.addEventListener("DOMContentLoaded", () => {
    let {page} = getUrlVars();
    page == undefined ? page = 1 : null;
    renderPolularMovies(page);
    renderControl(page);
})

const getUrlVars = () => {
    let vars = {};
    window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m, key, value){
        vars[key] = value;
    });
    return vars;
}


const getPopularMovies = (page) => {
    const url = `${URL_PATH}/3/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`;

    return fetch(url)
    .then(response => response.json())
    .then(result => result.results)
    .catch(error => console.log(error))
}

const renderPolularMovies = async (page) => {
    const movies = await getPopularMovies(page);

    let html = "";
    movies.forEach( movie => { 
        const { id, title, poster_path} = movie;
        const urlImage = `https://image.tmdb.org/t/p/w500${poster_path}`;
        const urlMoreInfo = `../movie.html?id=${id}`;

        html += `
            <div class = "col-3 col-custom">
                <a href = "${urlMoreInfo}" class = "card custom-card">
                    <img src="${urlImage}" class="card-ing-top" alt="${title}"/>
                    <div class="card-body">
                        <h4 class="card-title text-center m-0">${title}</h4>
                    </div>
                </a>
            </div>
        `;

    });
    document.getElementsByClassName('list-cards')[0].innerHTML = html;


}

const renderControl = (page) => {
    const baseUrlPage = "../popular.html?page=";
    const pageNumber = parseInt(page);
    const prev = pageNumber - 1;
    const next = pageNumber + 1;

    let html = "";

    if(page == 1){
        html = `
            <ul class = "pagination justify-content-center">
                <li class = "page-item disabled">
                    
                </li>
                <li class = "page-item active">
                    <a class = "page-link" href="${baseUrlPage + "1"}">1</a>
                </li>
                <li class = "page-item">
                    <a class = "page-link" href="${baseUrlPage + "2"}">2</a>
                </li>
                <li class = "page-item">
                    <a class = "page-link" href="${baseUrlPage + "3"}">3</a>
                </li> 
                <li class = "page-item">
                    <a class = "page-link" href="${baseUrlPage + "2"}">
                    <i class = "fas fa-chevron-right">></i>
                    </a>
                </li>               
            </ul>
        `;
    }else{
        html = `
            <ul class = "pagination justify-content-center">
                <li class = "page-item">
                    <a class = "page-link" href="${baseUrlPage + prev}">
                        <i class = "fas fa-chevron-right"><</i>
                    </a>                
                </li>
                <li class = "page-item ">
                    <a class = "page-link" href="${baseUrlPage + prev}">${prev}</a>
                </li>
                <li class = "page-item active">
                    <a class = "page-link" href="${baseUrlPage + page}">${page}</a>
                </li>
                <li class = "page-item">
                    <a class = "page-link" href="${baseUrlPage + next}">${next}</a>
                </li> 
                <li class = "page-item">
                    <a class = "page-link" href="${baseUrlPage + next}">
                    <i class = "fas fa-chevron-right">></i>
                    </a>
                </li>               
            </ul>
        `;      
    }
    document.getElementsByClassName('navigation')[0].innerHTML = html;
}