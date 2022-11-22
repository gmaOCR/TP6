//Promises URL
const IMDBScoreURL = 'http://localhost:8000/api/v1/titles/?sort_by=-imdb_score';
const IMDBScoreURLPageSize8 = 'http://localhost:8000/api/v1/titles/?page_size=8&sort_by=-imdb_score';
//Modal container constant
const modalContainer = document.querySelector(".modal-content")
const modalSpansNames = ["image_url","title", "genres", "date_published","rated","imdb_score",
"directors", "actors", "duration", "countries","worldwide_gross_income","description" ]
//Carousel 
const slidesContainer = document.getElementById("slides-container");
// const slide = document.querySelector(".slide");
const slides7BestMovies = document.querySelector("#sevenBestMovies > section.slider-wrapper > ul.slides-container");
const prevButton = document.getElementById("slide-arrow-prev");
const nextButton = document.getElementById("slide-arrow-next");
nextButton.addEventListener("click", () => {
    const slideWidth = slide.clientWidth;
    slidesContainer.scrollLeft += slideWidth;
});
prevButton.addEventListener("click", () => {
    const slideWidth = slide.clientWidth;
    slidesContainer.scrollLeft -= slideWidth;
});
//End carousel



// Modal
let modal = document.querySelector(".modal");
// let trigger = document.querySelector(".open-btn");
let closeButton = document.querySelector(".close-button");

function toggleModal() {
    modal.classList.toggle("show-modal");
}
function windowOnClick(event) {
    if (event.target === modal) {
        toggleModal();
    }
}

// trigger.addEventListener("click", toggleModal);
closeButton.addEventListener("click", toggleModal);
window.addEventListener("click", windowOnClick);
// End Modal

//Movie constructor
// class Movie {
//     constructor(image_url, title, genres, date_published, rated, 
//         imdb_score, directors, actors, duration, countries, worldwide_gross_income,
//         description) {
//             this.image_url = image_url
//             this.title = title
//             this.genres = genres
//             this.date_published = date_published
//             this.rated = rated
//             this.imdb_score = imdb_score
//             this.directors = directors
//             this.actors = actors
//             this.duration = duration
//             this.countries = countries
//             this.worldwide_gross_income = worldwide_gross_income
//             this.description = description
//         }

//         createElementsFromMovieListParameter(movieObj) {
        
//         }
// }


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
// testing
function createElementForSlideContainer(movieObj, liTag) {
    let element = document.createElement("IMG")
    element.setAttribute("src", movieObj.image_url)
    liTag.appendChild(element)
    // element.addEventListener(onclick,toggleModal)
    element.onclick = function () {
    let temp = document.querySelector("#genres")
    temp.textContent = movieObj.genres

    modal.classList.toggle("show-modal")
    }
}
// end testing
// console.log(sevenBestMoviesObj)
//Create li section for carousel + call fucntion to create and insert IMG
function createLiforCarousel(moviesListObj, sliderContainerUl){
    let i = 0
    for (let movie in moviesListObj) { 
        movie = document.createElement("li");
        movie.classList.add("slide"); 
        createElementForSlideContainer(moviesListObj[i], movie)
        sliderContainerUl.appendChild(movie);
        i = i + 1   
    }
    }

// //Create span section for modal
// function createSpanForModal(modalContainer, modalSpansNames){
//     let temp
//     for (let text in modalSpansNames) {
//         temp = document.createElement("span")
//         temp.classList.add(modalSpansNames[text])
//         modalContainer.appendChild(temp)
// }
// }

createLiforCarousel(sevenBestMoviesObj, slides7BestMovies)

//testing
const slide = document.querySelector(".slide");
let test =[]
for (let i in modalSpansNames) { 
    // console.log("."+ (modalSpansNames[i]));
    test.push(("."+ (modalSpansNames[i])))
}
// console.log(test)


// createSpanForModal(modalContainer,modalSpansNames)


//get Img URL by list for slides carousel from movie obj
// function getBestMoviesImgForSlides(moviesObjList) {
//     let URLimg4Slides = []
//     for (let movie in moviesObjList) {
//         URLimg4Slides.push(moviesObjList[movie].image_url)
//     }
//     return URLimg4Slides
// }

// let URLImgBestMovies = getBestMoviesImgForSlides(sevenBestMoviesObj)


//create elements by list from URL img list
// function createIMGElementsWithSrc(URLImgList) {
//     let imgElementsList = []
//     for (let img in URLImgList) {
//         let element = document.createElement("IMG")
//         element.setAttribute("src", URLImgList[img])
//         imgElementsList.push(element)
//     }
//     return imgElementsList
// }

// let imgElementsList = createIMGElementsWithSrc(URLImgBestMovies)

// for (let i in imgElementsList) {
//     slides7BestMovies[i].appendChild(imgElementsList[i])
// }


// console.log(sevenBestMoviesObj)



// function createElementsDataByMovieObjForModal(movieObj) {
//     let element
//     for (let i in movieObj[i]){
        
//     }
// }
// let test = document.querySelector("#sevenBestMovies")
// console.log(test)
// console.log(test.querySelector(".modal-content > .first-title"))
// open-modal(imgElementsList[i], movieObj)