class Carousel {
    constructor(carouselWrapper, carousel, controls, textElem) {
        this.carouselWrapper = carouselWrapper;
        this.carousel = carousel;
        this.controls = controls;
        this.textElem = textElem;
    }

    init() {
        console.log(this)
        this.controls.addEventListener('click', this.handleControls.bind(this));
    }

    handleControls(event) {
        const btn = event.target.closest('.btn');
        console.log(btn)
        if (btn.dataset.direction === 'right') {
            this.changeNumberText(true);
        } else {
            this.changeNumberText(false);
        }
    }

    changeNumberText(isForward = true) {
        const numText = this.textElem.innerText.split(' / ');
        const cardsLength = this.carousel.querySelectorAll('.members__card').length;
        if (isForward) {
            this.textElem.innerHTML = numText[1] === String(cardsLength) ? this.textElem.innerText : `${parseInt(numText[0]) + 3} / ${parseInt(numText[1]) + 3}`;
            this.carousel.classList.remove('backward');
            this.carousel.classList.add('forward');
        } else {
            this.textElem.innerHTML = numText[0] === '1' ? this.textElem.innerText : `${parseInt(numText[0]) - 3} / ${parseInt(numText[1]) - 3}`;
            this.carousel.classList.remove('forward');
            this.carousel.classList.add('backward');
        }

        console.log(this.textElem.innerHTML)
    }
}

export default Carousel;
