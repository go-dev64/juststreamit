import { url } from './category.js'
import { Film } from './film.js'

let modal = null

export function target () {
  document.addEventListener('click', function (event) {
    const theBestFilm = document.querySelector('#best_film')
    const element = event.target.className
    if (element === 'item__image') {
      loadFilm(event.target.parentElement.dataset.id)
    } else if (theBestFilm.contains(event.target)) {
      loadFilm(theBestFilm.firstElementChild.dataset.id)
    }
  }
  )
}

function openModal () {
  const target = document.querySelector('.modal')
  target.style.display = null
  target.removeAttribute('aria-hidden')
  target.setAttribute('aria-modal', 'true')
  modal = target
  modal.addEventListener('click', closeModal)
  modal.querySelector('.close__modal').addEventListener('click', closeModal)
  modal.querySelector('.close__modal').addEventListener('click', stopPropagation)
}

const closeModal = function (event) {
  const element = event.target.className
  if (element !== 'close__modal') return
  event.preventDefault()
  modal.style.display = 'none'
  modal.setAttribute('aria-hidden', 'true')
  modal.removeAttribute('aria-modal')
  modal.removeEventListener('click', closeModal)
  modal.querySelector('.close__modal').removeEventListener('click', closeModal)
  modal.querySelector('.close__modal').removeEventListener('click', stopPropagation)
  modal = null
  const aside = document.querySelector('aside')
  aside.remove()
}

const stopPropagation = function (event) {
  event.stopPropagation()
}

async function loadFilm (idFilm) {
  const response = await fetch(`${url}${idFilm}`)
  const jsonFilm = await response.json()
  new Film('#best_movies', jsonFilm, 1).createElementModal()
  openModal()
}
