const url = "http://127.0.0.1:8000/api/v1/titles/"


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
        filmContainer.dataset.id = this.id
        // creation d'une balise image du film
        const imageFilm = document.createElement("img")
        imageFilm.src = this.urlImg
        // creation d'une balise tititre du film
        const titleFilm = document.createElement("h3")
        titleFilm.innerText = this.title
        const descriptionFilm = document.createElement("p")
        descriptionFilm.innerText = this.descritpion
        const filmBouton = document.createElement("button")
        filmBouton.innerText = "Play"
        const index = document.createElement("p")
        index.innerText = this.index

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
     *  creation de la category de film
     * @param {element html} parentElement => emplacement de la categorie dans le html  
     * @param {string} categoryName
     */

    numberElementInCategories = 7

    constructor(parentElement, categoryName) {
        this.parent = document.querySelector(parentElement)
        this.category = categoryName
        this._idBestFilm = ""
        this.getFilms()
    }

    /**
     * récuperer une liste de 7 films tier dans l'ordre decroissant par score et votes de la categorie
     * creer les differents elements html de la categorie 
     * @returns {element html}
     */
    async getFilms () {
        console.log(this.category)
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
        const data = await fetch(`${url}?page_size=${this.numberElementInCategories}&genre=${this.category}&sort_by=-imdb_score,-votes`)
        const jsonData = await data.json()
        const filmList = jsonData.results
        this.createFilm(filmList)
    }

    /**
     * recuperation des la liste des films des meilleurs film
     * creation du meilleur film dans le HtmlParents => .best_film
     */
    async requestBestMovies () {
        const data = await fetch(`${url}?page_size=${this.numberElementInCategories + 1}&genre=&sort_by=-imdb_score,-votes`)
        const jsonData = await data.json()
        const filmList = jsonData.results
        const bestFilm = filmList.shift()
        console.log(bestFilm)
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
const action = new Categories(".carousel_cat1", "Action")
const comedie = new Categories(".carousel_cat2", "Comedy")
const scienceFiction = new Categories(".carousel_cat3", "Sci-Fi")


 