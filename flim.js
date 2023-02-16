// recuperation des films dans le localStorage
let films = window.localStorage.getItem("films")

if (films === null) {
    //récuperation des films depuis l api
    const reponse  = await fetch()
}


class MeilleurFilm {
    /**
     * @param {element HTML} elementRacine 
     * @param {Objet} option 
     */
    
    constructor (elementRacine, options ={}) {
        this.element = elementRacine
        this.titleFlim = options.title
        this.urlImg = options.image_url
        this.descritpion = options.descritpion

    }

    
}