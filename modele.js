/* eslint-disable no-unused-vars */
const url = 'http://127.0.0.1:8000/api/v1/titles/'

class Film {
  /**
     * @param {element HTML} elementRacine
     * @param {Objet} option
     */

  constructor (elementRacine, options = {}, index) {
    this.element = elementRacine
    this.id = options.id
    this.title = options.title
    this.urlImg = options.image_url
    this.descritpion = options.description
    this.index = index
  }

  createHtmlElement () {
    // creation d'une div pour le container__item
    this.containerItem = document.createElement('div')
    this.containerItem.className = 'container__item'
    // creation d'une balise pour le film
    this.filmContainer = document.createElement('div')
    this.filmContainer.dataset.id = this.id
    // creation d'une balise image du film
    this.imageFilm = document.createElement('img')
    this.imageFilm.src = this.urlImg
    // creation d'une balise tititre du film
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
    this.element.appendChild(this.containerItem)
    this.containerItem.appendChild(this.filmContainer)
    this.filmContainer.appendChild(this.imageFilm)
    this.filmContainer.appendChild(this.titleFilm)
    this.filmContainer.appendChild(this.filmBouton)
    this.filmContainer.appendChild(this.descriptionFilm)
  }
}

class Categories {
  /**
     *  creation de la category de film
     * @param {element html} parentElement => emplacement de la categorie dans le html
     * @param {string} categoryName
     */

  numberElementInCategories = 7

  constructor (parentElement, categoryName) {
    this.parent = document.querySelector(parentElement)
    this.category = categoryName
    this.createHtmlElementCarousel()
    // eslint-disable-next-line no-return-assign
    this.listFilms = this.getFilms()
  }

  /**
     * récuperer une liste de 7 films tier dans l'ordre decroissant par score et votes de la categorie
     * creer les differents elements html de la categorie
     * @returns {element html}
     */
  async getFilms () {
    if (this.category === 'best_movies') {
      const theList = this.requestBestMovies()
      return theList
    } else {
      const theList = this.requestCategory()
      return theList
    }
  };

  /**
     * recuperation des film de la category et creation des film dans le parentHTML de la categorie
     */
  async requestCategory () {
    const data = await fetch(`${url}?page_size=${this.numberElementInCategories}&genre=${this.category}&sort_by=-imdb_score,-votes`)
    const jsonData = await data.json()
    const filmList = jsonData.results
    const list = this.createFilm(filmList)
    return list
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
    const list = this.createFilm(filmList)
    this.bestFilm(bestFilm.id)
    return list
  }

  /**
   * creation des element html pour le carousel
   */
  createHtmlElementCarousel () {
    this.carousel = document.createElement('div')
    this.carousel.className = 'carousel'
    this.carouselContainer = document.createElement('div')
    this.carouselContainer.className = 'carousel__container'
    this.parent.appendChild(this.carousel)
    this.carousel.appendChild(this.carouselContainer)
  }

  /**
     * creation des instance dobjet Film pour chaque element de la liste.
     * instance stoker dans this.filmObjectList.
     */
  createFilm (list) {
    const array = []
    for (const element in list) {
      const film = new Film(this.carouselContainer, list[element], element)
      film.createHtmlElement()
      array[element] = film
    }
    return array
  };

  /**
     * creation du film
     * @param {id du film} idFilm
     */
  async bestFilm (idFilm) {
    const response = await fetch(`${url}${idFilm}`)
    const jsonFilm = await response.json()
    const racine = document.querySelector('#best_film')
    new Film(racine, jsonFilm, 1).createHtmlElement()
  }
}

// eslint-disable-next-line no-unused-vars
const bestMovies = new Categories('#carousel_best_movies', 'best_movies')
const action = new Categories('#carousel_cat1', 'Action')
//const comedie = new Categories('#carousel_cat2', 'Comedy')
//const scienceFiction = new Categories('#carousel_cat3', 'Sci-Fi')

class Carousel {
  /**
      * @param {object} object category
       * @param {Objet} option
       * @param {Objet} options.slideToScroll => nombre d'éléments à faire defiler
       * @param {Objet} options.slideVisible => nombre d'éléments visible dans un slide
       */
  constructor (objectCategory, options = {}) {
    this.object = objectCategory
    this.parent = this.object.parent
    this.options = Object.assign({}, {
      slideToScroll: 1,
      slideVisible: 1
    }, options)
    this.carousel = this.object.carousel // let root grafikart
    this.carouselContainer = this.object.carouselContainer // let container grafikart
    const items = objectCategory.listFilms
    items.then(element => console.log(element))
    console.log(items)
    this.currentItem = 0
    this.setStyle()
    this.createNavigation()
  };

  /**
   * Redimensions les elements en fonction de la taille de la fenetres
   */
  setStyle () {
    const ratio = this.object.numberElementInCategories / this.options.slideVisible
    this.carouselContainer.style.width = (ratio * 100) + '%'
    // eslint-disable-next-line no-return-assign
    //this.items.style.width = ((100 / this.options.slideVisible) / ratio + '%')

  };

  /**
   * creation de d'un div avec une class definie
   * @param {string} className = nom de la class de la div
   * @returns nouvelle div
   */
  createDivWithClass (className) {
    const div = document.createElement('div')
    div.setAttribute('class', className)
    return div
  };

  /**
   * creation des bouton de navigation du carousel
   */
  createNavigation () {
    const nextButton = this.createDivWithClass('carousel__next')
    const prevButton = this.createDivWithClass('carousel__prev')
    this.carousel.appendChild(nextButton)
    this.carousel.appendChild(prevButton)
    nextButton.addEventListener('click', this.next.bind(this))
    prevButton.addEventListener('clock', this.prev.bind(this))
  };

  next () {
    this.goToItem(this.currentItem + this.options.slideToScroll)
  };

  prev () {
    this.goToItem(this.currentItem - this.options.slideToScroll)
  };

  /**
   * Deplace le carousel vers l'element cible
   * @param {number} index.
   */
  goToItem (index) {
    // eslint-disable-next-line prefer-const
    let translateX = index * -100 / this.object.numberElementInCategories
    this.carouselContainer.style.transform = 'translate3d(' + translateX + '%, 0, 0)'
    this.currentItem = index
  };
}

document.addEventListener('DOMContentLoaded', function () {
  // eslint-disable-next-line no-new
  new Carousel(bestMovies, {
    slideToScroll: 3,
    slideVisible: 3
  })
})
