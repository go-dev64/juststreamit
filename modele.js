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


class Film {
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





class Categories {
    /**
     * 
     * @param {element html} parentElement => emplacement de la categorie dans le html  
     * @param {string} categoryName
     */

    numberElementInCategories = 7

    constructor(parentElement, categoryName="") {
        this.parent = document.querySelector(parentElement)
        this.category = categoryName
        this._idBestFilm = ""
        this.getFilms()
    }

    /**
     * @param {any} value
     
    set getIdFilm (value) {
        this._idBestFilm = value
    }
    */


    /**
     * récuperer une liste de 7 films tier dans l'ordre decroissant par score et votes de la categorie
     * @returns {list of objet}
     */
    async getFilms () {
        if (this.category === "best_movies"){
            this.requestBestMovies()


        }else{
            this.requestCategory()
        }
    };

    /**
     * recuperation des film de la category et creation des film dans le parentHTML de la categorie
     */
    async requestCategory (){
        const data = await fetch(`${url}?page_size=${this.numberElementInCategories}&genres=${this.category}&sort_by=-imdb_score,-votes`)
        const jsonData = await data.json()
        const filmList = jsonData.results
        this.createFilm(filmList)
    }

    /**
     * recuperation des la liste des films des meilleurs film
     * creation du meilleur film dans le HtmlParents => .best_film
     */
    async requestBestMovies () {
        const data = await fetch(`${url}?page_size=${this.numberElementInCategories + 1}&genres=${this.category}&sort_by=-imdb_score,-votes`)
        const jsonData = await data.json()
        const filmList = jsonData.results
        const bestFilm = filmList.shift()
        this.createFilm(filmList)
        this.bestFilm(bestFilm.id)
    }


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

    /**
     * creation du film
     * @param {id du film} idFilm 
     */
    async bestFilm(idFilm){
        console.log(idFilm)
        console.log(`${url}${idFilm}`)
        const response = await fetch(`${url}${idFilm}`)
        const jsonFilm = await response.json()
        const racine = document.querySelector(".best_film")
        new Film(racine, jsonFilm, 1).createHtmlElement()
    }
}

const bestMovies = new Categories(".carousel_best_movies", "best_movies")


 