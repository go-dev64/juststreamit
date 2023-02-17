

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
            this.children = [].slice.call(element.children)
            let toto = this.createDivWithClass("carousel")
            this.container = this.createDivWithClass("carousel__container")
            toto.appendChild(this.container)
            this.element.appendChild(toto)
            this.children.forEach((child) => {
                let item = this.createDivWithClass("carousel__item")
                //item.style.width = ((100 / this.options.slideVisible) / ratio) + "%"
                item.appendChild(child)
                this.container.appendChild(item)
            })
    }

    setStyle () {
        let ratio = this.children.length / this.options.slideVisible
        this.container.style.width = (ratio * 100) + "%"
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

    new Carousel(document.querySelector("#carousel1"), {
        slideToScroll: 3,
        slideVisible: 3
    })
})