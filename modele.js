const url = "http://127.0.0.1:8000/api/v1/titles/"
/** 
// recuperation des 7 premieres notes par categories
var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  
  
let listElement = []
let listallNotes = []
    // boucle pour recuperer les note dans plusieurs page tans que listNote =7
let numberPage = 0
while (listElement.length < 7) {
    numberPage++;
    // Recuperation des element trier par imdb dans l'ordre decroissant(tous les films) 
     const reponseBestScore = await fetch("http://127.0.0.1:8000/api/v1/titles/?genre=action&sort_by=-imdb_score", requestOptions)
     .then(response => response.text())
     .then(result => console.log(result))
     .catch(error => console.log('error', error));
    //ajout des element et notes des les arrays correspondant
    for (const i in reponseBestScore.results) {
        const element = reponseBestScore.results[i]
        listElement.push(element)
        //suppression  des doublons
        if(!listallNotes.includes(parseFloat(element.imdb_score))){
            listallNotes.push(parseFloat(element.imdb_score))
        }
    }
}    
*/


const Film = class {
    /**
     * @param {element HTML} elementRacine 
     * @param {Objet} option 
     */
    
    constructor (elementRacine, options ={}, index) {
        this.element = elementRacine
        this.id = options.id
        this.title = options.title
        this.urlImg = options.image_url
        this.descritpion = options.descritpion
        this.index = index
    }
    createHtmlElement () {
        // creation d'une balise pour le film
        const filmContainer = document.createElement("div")
        filmContainer.dataset.id = this.index
        // creation d'une balise image du film
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

const numberElementInCategories = 7
const Categories = class {
    /**
     * 
     * @param {element html} parentElement => emplacement de la categorie dans le html  
     * @param {string} categoryName
     */

    constructor(parentElement, categoryName="") {
        this.parent = document.querySelector(parentElement)
        this.category=categoryName
        this.idBestFilm = 
        this.requestFilms()
    }

    /**
     * récuperer une liste de 7 films tier dans l'ordre decroissant par score et votes de la categorie
     * @returns {list of objet}
     */
    async requestFilms () {
        const data = await fetch(`${url}?page_size=${numberElementInCategories}&genres=${this.category}&sort_by=-imdb_score,-votes`)
        const jsonData = await data.json()
        const filmElement = jsonData.results
        this.createFilm(filmElement)
        const idBestFilm = JSON.stringify(filmElement[0].id)
        this.idBestFilm = idBestFilm
    };

    /**
     * creation des instance dobjet Film pour chaque element de la liste.
     * instance stoker dans this.filmObjectList.
     */
    createFilm (list) {
        for (const element in list){
            var film = new Film (this.parent, list[element], element)
            film.createHtmlElement()
        }
    };

    async bestFilm(){
        const response = await fetch(`${url}${this.idBestFilm}`)
        const jsonFilm = await response.json()
        const film = jsonFilm.results
        const racine = document.querySelector(".best_film")
        new Film(racine, film, 1).createHtmlElement()
    }
}

const bestMovies = new Categories(".carousel_best_movies", "")
bestMovies.bestFilm()
const toto = bestMovies.idBestFilm
console.log(toto)

 