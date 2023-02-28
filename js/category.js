export class Categories {
    /**
       *  creation de la category de film
       * @param {element html} parentElement => emplacement de la categorie dans le html
       * @param {string} categoryName
       */
  
    constructor (parentElement, categoryName, numberOfelement = 7) {
      this.numberElementInCategories = numberOfelement
      this.parent = document.querySelector(parentElement)
      this.category = categoryName
      this.createHtmlElementCarousel()
      // eslint-disable-next-line no-return-assign
      this.listFilms = this.getFilms()
    }
  
    /**
       * récuperer une liste defilms tier dans l'ordre decroissant par score et votes de la categorie
       * creer les differents elements html de la categorie
       * @returns {element html}
       */
    async getFilms () {
      if (this.category === 'best_movies') {
        return this.requestBestMovies()
      } else {
        return this.requestCategory()
      }
    };
  
    /**
       * recuperation des film de la category et creation des film dans le parentHTML de la categorie
       */
    async requestCategory () {
      const data = await fetch(`${url}?page_size=${this.numberElementInCategories}&genre=${this.category}&sort_by=-imdb_score,-votes`)
      const jsonData = await data.json()
      const filmList = jsonData.results
      return this.createFilm(filmList)
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
      this.bestFilm(bestFilm.id)
      return this.createFilm(filmList)
    }
  
    defineTitleCategory (nameOfCategory) {
      let title = ''
      switch (nameOfCategory) {
        case 'best_movies':
          title = 'Les Meilleures Films'
          break
        case 'Action':
          title = 'Les Meilleures Films d\'Action'
          break
        case 'Comedy':
          title = 'Les Meilleures Comédies'
          break
        case 'Sci-Fi':
          title = 'Les Meilleures Films de Sciences-Fiction'
          break
        default:
          title = 'Categorie'
      }
      return title
    }
  
    /**
     * creation des element html pour le carousel
     */
    createHtmlElementOfCategory () {
      this.div = document.createElement('div')
      this.div.className = 'category'
      this.title = document.createElement('h1')
      this.title.className = 'category_title'
      this.title.innerText = this.defineTitleCategory(this.category)
      this.categoryContainer = document.createElement('div')
      this.categoryContainer.className = 'category__container'
      this.parent.appendChild(this.div)
      this.div.appendChild(this.title)
      this.div.appendChild(this.categoryContainer)
    }
  
    /**
       * creation des instance dobjet Film pour chaque element de la liste.
       * instance stoker dans this.filmObjectList.
       */
    createFilm (list) {
      const array = []
      for (const element in list) {
        const film = new Film(this.categoryContainer, list[element], element)
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