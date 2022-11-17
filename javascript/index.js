//5 best movies promise
const IMDBScoreURL = 'http://localhost:8000/api/v1/titles/?sort_by=-imdb_score';
const IMDBScoreURLPageSize7 = 'http://localhost:8000/api/v1/titles/?page_size=7&sort_by=-imdb_score';


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

let moviesURL =  getResultsURLFromPromise(promiseForBestMovie)


//get objlist by fetching URLlist
async function getObjListFromURLList(URLlist) {
let objList = []
for (let url in URLlist) {
    const rep = await fetch(URLlist[url]);
    if (rep.ok) {
        let movie = await rep.json()
        objList.push(movie)
    }}
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
// to be coded

let rightBtn = document.createElement('button')
let bestMovieSection = document.querySelector("#bestMovie");
let bestMovieSpanIMG = document.querySelector("#bestMovieIMG")
let bestMovieSpanDesc = document.querySelector("#bestMovieDesc")
let bestMovieSpanTitle = document.querySelector("#bestMovieTitle")
let bestMovieBtn = document.querySelector("#btn")
let bestMovieImg = document.createElement("IMG");
bestMovieImg.setAttribute("src",bestMovieObj.image_url)
bestMovieSpanIMG.appendChild(bestMovieImg)
bestMovieSpanTitle.textContent = bestMovieObj.title
bestMovieSpanDesc.textContent = bestMovieObj.description
bestMovieBtn.textContent = "> Lire maintenant !"

// bestMovieSection.innerHTML = ("Meilleur film " +   + bestMovieObj.description)
//end best mvoie code

//Fetch 7 best movies
let promise7bestmovies = await getPromise(IMDBScoreURLPageSize7)
//get URLlist from promise
let sevenBestMoviesURL = getResultsURLFromPromise(promise7bestmovies)
//get objlist by fetching URLlist
let sevenBestMoviesObj = await getObjListFromURLList(sevenBestMoviesURL)


let best7Movies = document.querySelector("#best7Movies > p > span")