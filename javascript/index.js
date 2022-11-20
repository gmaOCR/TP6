//5 best movies promise
const IMDBScoreURL = 'http://localhost:8000/api/v1/titles/?sort_by=-imdb_score';
const IMDBScoreURLPageSize8 = 'http://localhost:8000/api/v1/titles/?page_size=8&sort_by=-imdb_score';
//Carousel 
const slidesContainer = document.getElementById("slides-container");
const slide = document.querySelector(".slide");
const slides7BestMovies = document.querySelectorAll("#sevenBestMovies > section.slider-wrapper > ul.slides-container > li.slide");
const prevButton = document.getElementById("slide-arrow-prev");
const nextButton = document.getElementById("slide-arrow-next");
nextButton.addEventListener("click", (event) => {
    const slideWidth = slide.clientWidth;
    slidesContainer.scrollLeft += slideWidth;
});
prevButton.addEventListener("click", () => {
    const slideWidth = slide.clientWidth;
    slidesContainer.scrollLeft -= slideWidth;
});

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

let promiseForBestMovie = await getPromise(IMDBScoreURL);

//get URLlist from promise
function getResultsURLFromPromise(promise) {
    let promiseResults = [];
    for (let data in promise.results) {
        promiseResults.push(promise.results[data].url);
    }
    return promiseResults
}

let moviesURL = getResultsURLFromPromise(promiseForBestMovie)


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

let moviesListObj = await getObjListFromURLList(moviesURL)

//Extract best movie object
let bestMovieObj = moviesListObj[0]
moviesListObj.forEach(film => {
    if (film.avg_vote > bestMovieObj.avg_vote) {
        bestMovieObj = film
    }
})

// console.log(bestMovieObj)

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
//end best movie code

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

function get7BestMoviesForSlides(moviesObjList) {
    let URLimg4Slides = []
    for (let movie in moviesObjList) {
        URLimg4Slides.push(moviesObjList[movie].image_url)
} 
return URLimg4Slides
}

let URLImg7BestMovies = get7BestMoviesForSlides(sevenBestMoviesObj)

function createIMGElementsWithSrc(URLImgList) {
    let imgElementsList = []
    for (let img in URLImgList) {
        let element = document.createElement("IMG")
        element.setAttribute("src", URLImgList[img])
        imgElementsList.push(element)
    }
    return imgElementsList
}

let ElementsList = createIMGElementsWithSrc(URLImg7BestMovies)
for (let i in ElementsList) {
    slides7BestMovies[i].appendChild(ElementsList[i])
}

console.log(slides7BestMovies)