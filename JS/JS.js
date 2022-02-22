const API_KEY = "8c8e1a50-6322-4135-8875-5d40a5420d86";
const API_URL_POPULAR = "https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=1";
const API_URL_SEARCH ="https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=";
getMovies(API_URL_POPULAR);

async function getMovies(url) {
    const resp = await fetch(url, {
        headers: {
            "Content-Type": "application/json",
            "X-API-KEY": API_KEY,
            
        },
    });
    const respData = await resp.json();
    showMovies(respData);
    
}
function getClassByRate(point) {
    if (point >= 7){
        return "green";
    }
    else if (point > 5) {
        return "orange";
    }
    else {
        return "red";
    }
}

function showMovies(data) {
    const moviesEl = document.querySelector(".movies");

    document.querySelector(".movies").innerHTML = "";

    data.films.forEach((movie) => {
        const movieEl = document.createElement("div")
        movieEl.classList.add("movie");
        movieEl.innerHTML = `
        <div class="movie_cover-inner">
                        <img src="${movie.posterUrlPreview}"
                        class="movie_cover"
                        alt="${movie.nameRu}"
                        />
                        <div class="movie__info">
                        <div class="movie_tittle">${movie.nameRu}</div>
                        <div class="movie_description">${movie.genres.map(
                            genre =>` ${genre.genre}`)}</div>
                     </div>
                     ${movie.rating && (`
                     <div class="movie_average movie_average--${getClassByRate(movie.rating)}">${movie.rating}</div>
                     `)
                    }
                        <footer class="movie_footer">
                        <div class="movie_bottom">
                            <div class="movie_year">
                                <span class="movie_year-value">${movie.year}</span>
                            </div>
                            
                        </div>
                    </footer>
                    </div>
                    `;
                    moviesEl.appendChild(movieEl);


    });
        
    
}
const form = document.querySelector("form");
const search = document.querySelector(".header_search");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const apiSearchUrl = `${API_URL_SEARCH}${search.value}`;
    if (search.value) {
        getMovies(apiSearchUrl);

        search.value = "";
    }
})
const progress = document.getElementById('progress');
const prev = document.getElementById('prev');
const next = document.getElementById('next');
const circles = document.querySelectorAll('.circle');

let currentActive = 1;

next.addEventListener('click', () => {
    currentActive++;
    if (currentActive > circles.length){
        currentActive = circles.length;
    }
    update(); 
});
prev.addEventListener('click', () => {
    currentActive--;
    if (currentActive < 1){
        currentActive=1;
    }
    update();
});

function update() {
    circles.forEach((circle, idx) => {
        if (idx < currentActive) {
            circle.classList.add('active');    
        }else {
            circle.classList.remove('active');
        }   
     });
     
     const actives = document.querySelectorAll('.active');

     progress.style.width = (actives.length - 1) / (circles.length - 1) * 100;

     if (currentActive === 1){
            prev.disabled = true;
     }else if(currentActive=== circles.length){
        next.disabled = true;
     }else {
         prev.disabled = false;
         next.disabled = false;
     }
}