const url = "http://127.0.0.1:8000/api/v1/titles/"

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



/** 
// recuperation des 7 premieres notes
let listElement = []
let listallNotes = []
    // boucle pour recuperer les note dans plusieurs page tans que listNote =7
let numberPage = 0
while (listElement.length < 7) {
    numberPage++;
    // Recuperation des element trier par imdb dans l'ordre decroissant(tous les films) 
     const reponseBestScore = await fetch (`${url}?page=${numberPage}&sort_by=-imdb_score`,
                            {method: "GET",
                            redirect: "follow"
                            })
                            .then(response => response.json())
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
function sort(){
    listElement.sort(function (a, b){
        return b.votes - a.votes;
    })
    listElement.sort(function (a, b){
        return b.imdb_score - a.imdb_score;
    })
}
sort()
const bestFilmId = await fetch (`${url}${listElement[0].id}`,
{method: "GET",
redirect: "follow"
})
.then(response => response.json())
.catch(error => console.log('error', error));




console.log(bestFilmId)
console.log(listElement)





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

const racine = document.querySelector(".best_film")
const objet = bestFilmId

new Film(racine, objet, 1)
const racineB = document.querySelector(".carousel_best_movies")
for (let i = 0; i < 6; i++){
  const theobjet = await fetch (`${url}${listElement[i].id}`,
                             {method: "GET",
                             redirect: "follow"
                             })
                            .then(response => response.json())
                            .catch(error => console.log('error', error));
   new Film(racineB, theobjet, i+1)                          
}
 