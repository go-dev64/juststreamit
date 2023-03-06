import { Film } from './film.js'
import { url } from './main.js'

export class Categories {
  /**
     *  creation de la category de film
     * @param {element html} parentElement => emplacement de la categorie dans le html
     * @param {string} categoryName
     */

  constructor (parentElement, categoryName) {
    this.numberElementInCategories = 7
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
    const data = await fetch(
      `${
        url
      }?page_size=${
        this.numberElementInCategories
      }&genre=${
        this.category
      }&sort_by=-imdb_score,-votes`
    )
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
