// tri des film par note dans l'ordre decroissant
const reponseBestScore = await fetch("http://127.0.0.1:8000/api/v1/titles/?sort_by=-imdb_score",
                                    {method: "GET",
                                    redirect: "follow"})
                                    .then(response => response.json())
                                    .catch(error => console.log('error', error)
                                    );     
// recuperation de la meilleur note                                                               
const bestScore = JSON.stringify(reponseBestScore.results[0].imdb_score)
const score = bestScore
bestScore

const reponse = await fetch("http://127.0.0.1:8000/api/v1/titles/?imdb_score=" + score + "&sort_by",
{method: "GET",
redirect: "follow"})
.then(response => response.json())
.catch(error => console.log('error', error)
);     





class Film {
    /**
     * @param {element HTML} elementRacine 
     * @param {Objet} option 
     */
    
    constructor (elementRacine, options ={}, index) {
        this.element = elementRacine
        this.title = options.title
        this.urlImg = options.image_url
        this.descritpion = options.descritpion
        this.index = index
        // creation d'une balise pour le film
        const filmContainer = document.createElement("div")
        filmContainer.dataset.id = this.index
        // creation d'une balise imge du film
        const imageFilm = document.createElement("img")
        imageFilm.src = this.urlImg
        // creation d'une balise tititre du film
        const titleFilm = document.createElement("h3")
        titleFilm.innerText = this.title
        const descriptionFilm = document.createElement("p")
        descriptionFilm.innerText = this.descritpion
        const filmBouton = document.createElement("button")
        filmBouton.dataset.id = this.index

        // rattachement des balise au element parent
        this.element.appendChild(filmContainer)
        filmContainer.appendChild(imageFilm)
        filmContainer.appendChild(titleFilm)
        filmContainer.appendChild(descriptionFilm)
        filmContainer.appendChild(filmBouton)
    }

    
}

const racine = document.querySelector(".best_film")
const objet = {
    descritpion: "une petite description poiur la route",
    title: "le tittre du film",
    image_url: "IMG_0212.JPG"  }

new Film(racine, objet, 1)
