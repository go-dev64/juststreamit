import { Categories } from './category.js'
import { Carousel } from './carousel.js'
import { target } from './modal.js'

export const url = 'http://127.0.0.1:8000/api/v1/titles/'

/**
 * Create catégories
 *
 */

const bestMovies = new Categories('#carousel_best_movies', 'best_movies')
const action = new Categories('#carousel_cat1', 'Action')
const comedie = new Categories('#carousel_cat2', 'Comedy')
const scienceFiction = new Categories('#carousel_cat3', 'Sci-Fi')
const listCategories = [bestMovies, action, comedie, scienceFiction]

/**
 * create carousel for each categories
 */
for (const element in listCategories) {
  document.addEventListener('DOMContentLoaded', function () {
    // eslint-disable-next-line no-new
    new Carousel(listCategories[element], {
      slideToScroll: 2,
      slideVisible: 4
    })
  })
}
/**
 * launch listener for modal
 */
target()
