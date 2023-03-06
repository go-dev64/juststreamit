export class Carousel {
  /**
   * This callback type is called `requestCallback` and is displayed as a global symbol.
   *
   * @callback moveCallback
   * @param {number} index
   */

  /**
      * @param {object} object category
       * @param {Objet} option
       * @param {Objet} [options.slideToScroll = 1]=> nombre d'éléments à faire defiler
       * @param {Objet} [options.slideVisible = 1] => nombre d'éléments visible dans un slide
       * @param {Boolean} [options.loop = false] => doit on looper en fin de carousel
       */
  constructor (objectCategory, options = {}) {
    this.object = objectCategory
    this.parent = this.object.parent
    this.options = Object.assign({}, {
      slideToScroll: 1,
      slideVisible: 1,
      loop: false
    }, options)
    this.isMobile = false
    this.table = false
    this.currentItem = 0
    this.moveCallbacks = []

    // modification du DOM
    this.carousel = this.object.carousel // let root grafikart
    this.carousel.setAttribute('tabindex', '0')
    this.carouselContainer = this.object.carouselContainer // let container grafikart
    this.object.listFilms.then(element => this.setStyle(element))
    this.createNavigation()

    // Evenement
    // eslint-disable-next-line n/no-callback-literal
    this.moveCallbacks.forEach(cb => cb(0))
    this.onWindowResize()
    window.addEventListener('resize', this.onWindowResize.bind(this))
    this.carousel.addEventListener('keyup', event => {
      if (event.key === 'ArrowRight' || event.key === 'Right') {
        this.next()
      } else if (event.key === 'ArrowLeft' || event.key === 'Left') {
        this.prev()
      }
    })
  };

  /**
   * Redimensions les elements en fonction de la taille de la fenetres
   */
  setStyle (list = []) {
    // eslint-disable-next-line no-undef
    const ratio = this.object.numberElementInCategories / this.slideVisible
    this.carouselContainer.style.width = (ratio * 100) + '%'
    // eslint-disable-next-line no-return-assign
    list.forEach((element) => element.filmContainer.style.width = ((100 / this.slideVisible) / ratio + '%'))
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
    prevButton.addEventListener('click', this.prev.bind(this))
    if (this.options.loop === true) {
      return
    }
    this.onMove(index => {
      if (index === 0) {
        prevButton.classList.add('carousel__prev--hidden')
      } else {
        prevButton.classList.remove('carousel__prev--hidden')
      }
      if (this.currentItem + this.slideVisible >= this.object.numberElementInCategories) {
        nextButton.classList.add('carousel__next--hidden')
      } else {
        nextButton.classList.remove('carousel__next--hidden')
      }
    })
  }

  next () {
    this.goToItem(this.currentItem + this.slideToScroll)
  }

  prev () {
    this.goToItem(this.currentItem - this.slideToScroll)
  }

  /**
   * Deplace le carousel vers l'element cible
   * @param {number} index.
   */
  goToItem (index) {
    if (index < 0) {
      if (this.options.loop) {
        index = this.object.numberElementInCategories - this.slideVisible
      } else {
        return
      }
    } else if (index >= this.object.numberElementInCategories || (
      this.currentItem + this.slideVisible >= this.object.numberElementInCategories && index > this.currentItem)) {
      if (this.options.loop) {
        index = 0
      } else {
        return
      }
    }
    // eslint-disable-next-line prefer-const
    let translateX = index * -100 / this.object.numberElementInCategories
    this.carouselContainer.style.transform = 'translate3d(' + translateX + '%, 0, 0)'
    this.currentItem = index
    this.moveCallbacks.forEach(cb => cb(index))
  }

  /**
   * Rajoute un écouteur qui écoute le déplacement du carousel
   * @param {moveCallback} cb
   */
  onMove (cb) {
    this.moveCallbacks.push(cb)
  }

  onWindowResize () {
    const mobile = window.innerWidth <= 550
    const tablette = window.innerWidth >= 551 && window.innerWidth < 850
    if (mobile !== this.isMobile) {
      this.isMobile = mobile
      this.setStyle()
      this.moveCallbacks.forEach(cb => cb(this.currentItem))
    } else if (tablette !== this.tablette) {
      this.tablette = tablette
      this.setStyle()
      this.moveCallbacks.forEach(cb => cb(this.currentItem))
    }
  }

  /**
   * @returns (numbers)
   */
  get slideToScroll () {
    if (this.isMobile) {
      return 1
    } else if (this.tablette) {
      return 2
    } else {
      return this.options.slideToScroll
    }
  }

  /**
   * @returns (numbers)
   */
  get slideVisible () {
    if (this.isMobile) {
      return 1
    } else if (this.tablette) {
      return 2
    } else {
      return this.options.slideVisible
    }
  }
}
