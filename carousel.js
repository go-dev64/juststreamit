class Carousel {
  /**
    * @param {element HTML} elementRacine
     * @param {Objet} option
     * @param {Objet} options.slideToScroll => nombre d'éléments à faire defiler
     * @param {Objet} options.slideVisible => nombre d'éléments visible dans un slide
     */
  constructor (element, options = {}) {
    this.element = element
    this.options = Object.assign({}, {
      slideToScroll: 1,
      slideVisible: 1
    }, options)

    
  }
  /**
    this.items = chidList.map((e) => {
      console.log(e)
      const item = this.createDivWithClass('carousel__item')
      item.appendChild(e)
      this.container.appendChild(item)
      return item
    })
    this.setStyle() */

  setStyle () {
    const ratio = this.items.length / this.options.slideVisible
    this.container.style.width = (ratio * 100) + '%'
    // eslint-disable-next-line no-return-assign
    this.items.forEach(item => item.style.width = ((100 / this.options.slideVisible) / ratio) + '%')
  }
  
}

document.addEventListener('DOMContentLoaded', function () {
  // eslint-disable-next-line no-new
  new Carousel(document.querySelector('#carousel_best_movies'), {
    slideToScroll: 3,
    slideVisible: 3
  })
})
