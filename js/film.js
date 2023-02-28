export class Film {
    /**
       * @param {element HTML} elementRacine
       * @param {Objet} option (object json ds info du film)
       */
  
    constructor (elementRacine, options = {}, index) {
      this.element = elementRacine
      this.id = options.id
      this.title = options.title
      this.urlImg = options.image_url
      this.descritpion = options.description
      this.index = index
      this.genres = options.genres
      this.date = options.year
      this.rated = options.rated
      this.scoreImdb = options.imdb_score
      this.director = options.directors
      this.actors = options.actors
      this.duration = options.duration
      this.country = options.countries
      this.resultBoxOffice = options.worldwide_gross_income
      this.longDescritpion = options.long_description
    }
   
    /**
     * creation des element html pour un film
     */
    createHtmlElement () {
      // creation d'une balise pour le film
      this.filmContainer = document.createElement('div')
      this.filmContainer.dataset.id = this.id
      this.filmContainer.className = 'item'
      // creation d'une balise image du film
      this.imageContainer = document.createElement('img')
      this.imageContainer.className = 'item__image'
      this.imageContainer.src = this.urlImg
      // creation d'une balise container pour les infos du film
      this.infoContainer = document.createElement('div')
      this.infoContainer.className = 'item__info'
      this.titleFilm = document.createElement('h3')
      this.titleFilm.innerText = this.title
      this.filmBouton = document.createElement('button')
      this.filmBouton.className = 'button'
      this.filmBouton.innerText = 'Play'
      this.descriptionFilm = document.createElement('p')
      this.descriptionFilm.innerText = this.descritpion
      this.index = document.createElement('p')
      this.index.innerText = this.index
  
      // rattachement des balise au element parent
      this.element.appendChild(this.filmContainer)
      this.filmContainer.appendChild(this.imageContainer)
      this.filmContainer.appendChild(this.infoContainer)
      this.infoContainer.appendChild(this.titleFilm)
      this.infoContainer.appendChild(this.filmBouton)
      this.infoContainer.appendChild(this.descriptionFilm)
    }

    /**
     * creation des element html pour la creation d'une modal
     */
    createElementModal () {
        const body = document.querySelector('body')
        const modal = document.createElement('aside')
        modal.className = 'modal'
        modal.style.display = 'none'
        const close = document.createElement('button')
        close.className = 'close__modal'
        close.innerText = 'Fermer'
        // image du film

        const imageFilm = document.createElement('img')
        imageFilm.className = 'modal__film__img'
        imageFilm.src = this.urlImg

        // tittre du film
        const titleFilm = document.createElement('h2')
        titleFilm.className = 'modal__film__title'
        titleFilm.innerText = this.title

        // info film
        const listInfoFilm = document.createElement('ul')
        listInfoFilm.className = 'info__film'

        // genre complet du film
        const genreFilm = document.createElement('li')
        genreFilm.className = 'genre__film'
        genreFilm.innerText = `Genre : ${this.genres}`

        // date de sortie
        const date = document.createElement('li')
        date.className = 'date__film'
        date.innerText = `Année de sortie : ${this.date}`

        // son rated
        const rated = document.createElement('li')
        rated.className = 'rated__film'
        rated.innerText = `Nombre évaluation : ${this.rated}`

        // son score IMDB
        const scoreImdb = document.createElement('li')
        scoreImdb.className = 'score_film'
        scoreImdb.innerText = `Note IMDB: ${this.scoreImdb}`

        // son realisateur
        const real = document.createElement('li')
        real.className = 'real__film'
        real.innerText = `Réalisateur: ${this.director}`

        // liste des acteur
        const actors = document.createElement('li')
        actors.className = 'actors__film'
        actors.innerText = `Acteurs: ${this.actors}`

        // sa durée
        const duration = document.createElement('li')
        duration.innerText = `Durée: ${this.duration} minutes`

        // pays d'origine
        const country = document.createElement('li')
        country.className = 'country__film'
        country.innerText = `Pays: ${this.country}`

        // resultat box office
        const boxOffice = document.createElement('li')
        boxOffice.innerText = `Nombre entrée au Box Office: ${this.resultBoxOffice}`

        // resume du film
        const resume = document.createElement('li')
        resume.innerText = `Résumé: ${this.longDescription}`

        // rattachement au parent
        body.appendChild(modal)
        modal.appendChild(close)
        modal.appendChild(imageFilm)
        modal.appendChild(titleFilm)
        modal.appendChild(listInfoFilm)
        listInfoFilm.appendChild(genreFilm)
        listInfoFilm.appendChild(date)
        listInfoFilm.appendChild(rated)
        listInfoFilm.appendChild(scoreImdb)
        listInfoFilm.appendChild(real)
        listInfoFilm.appendChild(actors)
        listInfoFilm.appendChild(duration)
        listInfoFilm.appendChild(country)
        listInfoFilm.appendChild(boxOffice)
        listInfoFilm.appendChild(resume)
    }
}