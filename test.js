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
        this.arrayElement = request().results
        this.filmObjectList = []
    }

    /**
     * récuperer une liste de 7 films tier dans l'ordre decroissant par score et votes de la categorie
     * @returns {list of objet}
     */
    async request () {
        const reponseCategories = await fetch(`${url}?page_size=${numberElementInCategories}&genres=${this.category}&sort_by=-imdb_score,-votes`,
        {method: "GET",
        redirect: "follow"
        })
        .then(reponse => reponse.json())
        .catch(error => console.log('error', error))
        return reponseCategories.results
    };

    /**
     * creation des instance dobjet Film pour chaque element de la liste.
     * instance stoker dans this.filmObjectList.
     */
    createFilm () {
        for (let i = 0; i < this.arrayElement.length; i++) {
           var film = new Film (this.parent, this.arrayElement[i], i)
            film.createHtmlElement()
        }
    };
}