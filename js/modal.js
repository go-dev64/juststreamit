import { url } from './main.js'
import { Film } from './film.js'

let modal = null

/**
 * fonvtion d ecoute d'evenement
 */
export function target () {
  document.addEventListener('click', function (event) {
    const element = event.target.className
    if (element === 'item__image') {
      loadFilm(event.target.parentElement.dataset.id)
    } else if (element === 'button') {
      loadFilm(event.target.parentElement.parentElement.dataset.id)
    }
  }
  )
}

/**
 * fonction douverture de modal
 */
function openModal () {
  const target = document.querySelector('.modal')
  target.style.display = null
  target.removeAttribute('aria-hidden')
  target.setAttribute('aria-modal', 'true')
  modal = target
  modal.focus()
  modal.querySelector('.close__modal').addEventListener('click', closeModal)
  modal.querySelector('.close__modal').addEventListener('click', stopPropagation)
  closeModalWithKeyboard()
}

/**
 * fermeture modal
 * @param {evenement} event => click sur le bouton fermer de la modal
 */
const closeModal = function (event) {
  if (modal === null) return
  const element = event.target.className
  if (element === 'close__modal' || event.key === 'Escape' || event.key === 'Esc') {
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
}

const focusInModal = function (e) {
  e.preventDefault()
  const button = modal.querySelector('button')
  button.focus()
  window.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
      closeModal(event)
    }
  })
}

function closeModalWithKeyboard () {
  window.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' || event.key === 'Esc') {
      closeModal(event)
    }
    if (event.key === 'Tab' && modal !== null) {
      focusInModal(event)
    }
  })
}

/**
 * evite la propagation au autre element
 * @param {event} event
 */
const stopPropagation = function (event) {
  event.stopPropagation()
}

/**
 * charge les element du film pour qu ils soient affich??s dans la fenetre modal
 * @param {string} idFilm
 */
async function loadFilm (idFilm) {
  try {
    const response = await fetch(`${url}${idFilm}`, 
    {method : 'GET',
    "Accept": "applications/json"
    })
    if (response.ok) {
      const jsonFilm = await response.json()
      new Film('#best_movies', jsonFilm, 1).createElementModal()
      openModal()
    }
    
  } catch (error) {
    alert('Probleme de connexion serveur')
  }
    
       
}
