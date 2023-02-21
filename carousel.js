

class Carousel {
    /**
     * @param {element HTML} elementRacine 
     * @param {Objet} option 
     * @param {Objet} options.slideToScroll => nombre d'éléments à faire defiler
     * @param {Objet} options.slideVisible => nombre d'éléments visible dans un slide
     */
    
    constructor (element, options ={}) {
        this.element = element
        this.options = Object.assign({}, {
            slideToScroll: 1,
            slideVisible: 1
            }, options)
        let chidList = [element.children]
        let root = this.createDivWithClass('carousel')
        this.container = this.createDivWithClass("carousel__container")
        root.appendChild(this.container)
        this.element.appendChild(root)
        const x = chidList.shift()
        this.items = chidList.map((e) => {
            console.log(e)
            let item = this.createDivWithClass("carousel__item")
            item.appendChild(e)
            this.container.appendChild(item)
            return item
        })
        this.setStyle()
    }



    setStyle () {
        let ratio = this.items.length / this.options.slideVisible
        this.container.style.width = (ratio * 100) + "%"
        this.items.forEach(item => item.style.width = ((100/this.options.slideVisible) / ratio) + "%")
    }

    /**
     * 
     * @param {string} className 
     * @returns {HTMLElement}
     */
    createDivWithClass (className) {
        let div = document.createElement("div")
        div.setAttribute("class", className)
        return div

    }
}


document.addEventListener("DOMContentLoaded", function () {

    new Carousel(document.querySelector("#carousel_best_movies"), {
        slideToScroll: 3,
        slideVisible: 3
    })
})