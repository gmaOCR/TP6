//Promises URL to get datas
const IMDBScoreURL = 'http://localhost:8000/api/v1/titles/?sort_by=-imdb_score';
const IMDBScoreURLPageSize8 = 'http://localhost:8000/api/v1/titles/?page_size=8&sort_by=-imdb_score';
const IMDBScoreURLSciFiPageSize7 = "http://localhost:8000/api/v1/titles/?page_size=7&genre=Sci-Fi&sort_by=-imdb_score"
const IMDBScoreURLActionPageSize7 = "http://localhost:8000/api/v1/titles/?page_size=7&genre=Action&sort_by=-imdb_score"
const IMDBScoreURLComedyPageSize7 = "http://localhost:8000/api/v1/titles/?page_size=7&genre=Comedy&sort_by=-imdb_score"
//Modal container constant
const modalContainer = document.querySelector(".modal-content")
// const modalSpansNames = ["image_url","title", "genres", "date_published","rated","imdb_score",
// "directors", "actors", "duration", "countries","worldwide_gross_income","description" ]
//Constant for carousel - add here if you want add a new carousel
const slides7BestMovies = document.querySelector("#sevenBestMovies > section.slider-wrapper > ul.slides-container");
const slides7BestMoviesCat1 = document.querySelector("#sevenBestMoviesCat1 > section.slider-wrapper > ul.slides-container");
const slides7BestMoviesCat2 = document.querySelector("#sevenBestMoviesCat2 > section.slider-wrapper > ul.slides-container");
const slides7BestMoviesCat3 = document.querySelector("#sevenBestMoviesCat3 > section.slider-wrapper > ul.slides-container");
//Carousel const
const slidesContainer = document.getElementById("slides-container");


// Modal
let modal = document.querySelector(".modal");
let closeButton = document.querySelector(".close-button");

function toggleModal() {
    modal.classList.toggle("show-modal");
}
function windowOnClick(event) {
    if (event.target === modal) {
        toggleModal();
    }
}
closeButton.addEventListener("click", toggleModal);
window.addEventListener("click", windowOnClick);
// End Modal

// Start functions paragrafer
//Get promise function
async function getPromise(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }
        const datas = await response.json();
        return datas
    }
    catch (error) {
        console.error(`Could not get products: ${error}`);
    }
}

//get URLlist from promise
function getResultsURLFromPromise(promise) {
    let promiseResults = [];
    for (let data in promise.results) {
        promiseResults.push(promise.results[data].url);
    }
    return promiseResults
}

//get objlist by fetching URLlist
async function getObjListFromURLList(URLlist) {
    let objList = []
    for (let url in URLlist) {
        const rep = await fetch(URLlist[url]);
        if (rep.ok) {
            let movie = await rep.json()
            objList.push(movie)
        }
    }
    return objList
}

// Creation complete carousel and carousel content
function createCarousel(moviesListObj, sliderContainerUl){
    let i = 0
    for (let movie in moviesListObj) { 
        movie = document.createElement("li");
        movie.classList.add("slide"); 
        createElementForSlideContainer(moviesListObj[i], movie)
        sliderContainerUl.appendChild(movie);
        let wrapper = sliderContainerUl.closest(".slider-wrapper")
        console.log(wrapper)
        let nextButton = wrapper.querySelector("section > #slide-arrow-next");
        console.log(nextButton)
        let prevButton = wrapper.querySelector("section > #slide-arrow-prev");
        nextButton.addEventListener("click", () => {
            const slideWidth = slide.clientWidth;
            sliderContainerUl.scrollLeft += slideWidth;
        });
        prevButton.addEventListener("click", () => {
            const slideWidth = slide.clientWidth;
            sliderContainerUl.scrollLeft -= slideWidth;
        });
        i = i + 1   
    }
    }
//Create modal content (best movie)
function createEventOnclickAndModalContent(movieObj,imgElement) {
    imgElement.onclick = function () {
    let thumbnail = document.querySelector('#thumbnail')
    let title = document.querySelector('#title')
    let genres = document.querySelector("#genres")
    let published = document.querySelector('#date_published')
    let rated = document.querySelector('#rated')
    let imdb = document.querySelector('#imdb_score')
    let directors = document.querySelector('#directors')
    let actors = document.querySelector('#actors')
    let duration = document.querySelector('#duration')
    let countries = document.querySelector('#countries')
    let resultat = document.querySelector('#worldwide_gross_income')
    let description = document.querySelector('#description')
    thumbnail.setAttribute("src", movieObj.image_url)
    title.textContent = movieObj.title
    genres.textContent = movieObj.genres
    published.textContent = movieObj.date_published
    rated.textContent = movieObj.rated
    imdb.textContent = movieObj.imdb_score
    directors.textContent = movieObj.directors
    actors.textContent = movieObj.actors
    duration.textContent = movieObj.duration
    countries.textContent = movieObj.countries
    resultat.textContent = movieObj.resultat
    description.textContent = movieObj.description
    modal.classList.toggle("show-modal")
    }
}

//Create all elements for modal and event onclick
function createElementForSlideContainer(movieObj, liTag) {
    let element = document.createElement("IMG")
    element.setAttribute("src", movieObj.image_url)
    liTag.appendChild(element)
    element.onclick = function () {
    let thumbnail = document.querySelector('#thumbnail')
    let title = document.querySelector('#title')
    let genres = document.querySelector("#genres")
    let published = document.querySelector('#date_published')
    let rated = document.querySelector('#rated')
    let imdb = document.querySelector('#imdb_score')
    let directors = document.querySelector('#directors')
    let actors = document.querySelector('#actors')
    let duration = document.querySelector('#duration')
    let countries = document.querySelector('#countries')
    let resultat = document.querySelector('#worldwide_gross_income')
    let description = document.querySelector('#description')
    thumbnail.setAttribute("src", movieObj.image_url)
    title.textContent = movieObj.title
    genres.textContent = movieObj.genres
    published.textContent = movieObj.date_published
    rated.textContent = movieObj.rated
    imdb.textContent = movieObj.imdb_score
    directors.textContent = movieObj.directors
    actors.textContent = movieObj.actors
    duration.textContent = movieObj.duration
    countries.textContent = movieObj.countries
    resultat.textContent = movieObj.resultat
    description.textContent = movieObj.description
    modal.classList.toggle("show-modal")
    }
}
// End functions paragrafer


//Start best movie code
let promiseForBestMovie = await getPromise(IMDBScoreURL);
let moviesURL = getResultsURLFromPromise(promiseForBestMovie)
let moviesListObj = await getObjListFromURLList(moviesURL)
//Extract best movie object
let bestMovieObj = moviesListObj[0]
moviesListObj.forEach(film => {
    if (film.avg_vote > bestMovieObj.avg_vote) {
        bestMovieObj = film
    }
})
//insert best movie obj in HTML
let rightBtn = document.createElement('button')
let bestMovieSection = document.querySelector("#bestMovie");
let bestMovieSpanIMG = document.querySelector("#bestMovieIMG")
let bestMovieSpanDesc = document.querySelector("#bestMovieDesc")
let bestMovieSpanTitle = document.querySelector("#bestMovieTitle")
let bestMovieBtn = document.querySelector("#btn")
let bestMovieImg = document.createElement("IMG");
bestMovieImg.setAttribute("src", bestMovieObj.image_url)
bestMovieSpanIMG.appendChild(bestMovieImg)
bestMovieSpanTitle.textContent = bestMovieObj.title
bestMovieSpanDesc.textContent = bestMovieObj.description
bestMovieBtn.textContent = "Play"
createEventOnclickAndModalContent(bestMovieObj,bestMovieSpanIMG)
//End best movie code


// Start 8 best movies
//Fetch 8 best movies (so first one include)
let promise8BestMovies = await getPromise(IMDBScoreURLPageSize8)
//get URLlist from promise
let eightBestMoviesURL = getResultsURLFromPromise(promise8BestMovies)
//get objlist by fetching URLlist
let eightBestMoviesObj = await getObjListFromURLList(eightBestMoviesURL)
//exclude first best movie from 8 best movies list
let sevenBestMoviesObj = []
for (let i in eightBestMoviesObj) {
    if (eightBestMoviesObj[i].title != bestMovieObj.title) {
        sevenBestMoviesObj.push(eightBestMoviesObj[i])
    }
}
createCarousel(sevenBestMoviesObj, slides7BestMovies)
// End 8 best movies

// Start category1 8 best movies
let promise7BestMoviesCat1 = await getPromise(IMDBScoreURLSciFiPageSize7)
let sevenBestMoviesCat1URL = getResultsURLFromPromise(promise7BestMoviesCat1)
let sevenBestMoviesObjCat1 = await getObjListFromURLList(sevenBestMoviesCat1URL)
console.log(sevenBestMoviesObjCat1)
createCarousel(sevenBestMoviesObjCat1,slides7BestMoviesCat1)
// end category2 8 best movies

// Start category2 8 best movies
let promise7BestMoviesCat2 = await getPromise(IMDBScoreURLActionPageSize7)
let sevenBestMoviesCat2URL = getResultsURLFromPromise(promise7BestMoviesCat2)
let sevenBestMoviesObjCat2 = await getObjListFromURLList(sevenBestMoviesCat2URL)
console.log(sevenBestMoviesObjCat2)
createCarousel(sevenBestMoviesObjCat2,slides7BestMoviesCat2)
// end category2 8 best movies

// Start category3 8 best movies
let promise7BestMoviesCat3 = await getPromise(IMDBScoreURLComedyPageSize7)
let sevenBestMoviesCat3URL = getResultsURLFromPromise(promise7BestMoviesCat3)
let sevenBestMoviesObjCat3 = await getObjListFromURLList(sevenBestMoviesCat3URL)
console.log(sevenBestMoviesObjCat3)
createCarousel(sevenBestMoviesObjCat3,slides7BestMoviesCat3)
// end category3 8 best movies

const slide = document.querySelector(".slide");
