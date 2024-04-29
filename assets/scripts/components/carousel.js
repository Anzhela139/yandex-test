function minmax(val, min, max) {
    return Math.min(Math.max(val, min), max);
}

class Carousel {
    constructor(carouselWrapper, carousel, controls, textElem, cssTransition, paddingTransition, isDots) {
        this.carouselWrapper = carouselWrapper;
        this.carousel = carousel;
        this.controls = controls;
        this.textElem = textElem;
        this.cssTransition = cssTransition;
        this.paddingTransition = paddingTransition;
        this.isDots = isDots;
    }

    init() {
        this.controls.addEventListener('click', this.handleControls.bind(this));
        this.setCarouselTransition(1);
        this.handleResize();
    }

    handleResize() {
        if (window.scrollbarWidth <= 640 && !this.isDots) {
            this.textElem.innerHTML = '1 / 6'
        }
    }

    handleControls(event) {
        const btn = event.target.closest('.btn');
        if (this.isDots) {
            this.changeDots(btn, btn.closest('[data-direction]').dataset.direction === 'right');
        } else {
            this.changeNumberText(btn, btn.closest('[data-direction]').dataset.direction === 'right');
        }
    }

    getNumText(arr, length, isForward) {
        const numSlides = window.scrollbarWidth <= 640 ? 1 : 3;
        const numArr = arr.map((el) => parseInt(el))
        console.log(numArr, numSlides, length)
        return [
            minmax(isForward ? numArr[0] + numSlides : numArr[0] - numSlides, 1, length), 
            length
        ];
    }

    setDisabled(current, cardsLength) {
        console.log(current, cardsLength, current === 1, (window.scrollbarWidth > 640 && current === 3))
        if (current === 1 || (window.scrollbarWidth > 640 && current === 3)) {
            this.controls.querySelector('.control__left').classList.add('disabled');
            this.controls.querySelector('.control__right').classList.remove('disabled');
        } else if (current === cardsLength) {
            this.controls.querySelector('.control__left').classList.remove('disabled');
            this.controls.querySelector('.control__right').classList.add('disabled');
        } else {
            this.controls.querySelector('.control__left').classList.remove('disabled');
            this.controls.querySelector('.control__right').classList.remove('disabled');
        }
    }

    setCarouselTransition(current) {
        document.documentElement.style.setProperty(this.cssTransition, -((window.scrollbarWidth - this.paddingTransition) * (current - 1)) + "px");
    }

    changeDots(btn, isForward) {
        const oldCurrentDom = this.controls.querySelector('.current');
        const oldCurrent = parseInt(oldCurrentDom.dataset.dot);
        if ((oldCurrent === 5 && isForward) || (oldCurrent === 1 && !isForward)) return
        const current = isForward ? oldCurrent + 1 : oldCurrent - 1;

        oldCurrentDom.classList.remove('current');
        this.controls.querySelector(`[data-dot="${current}"]`).classList.add('current');
        this.setDisabled(current, 5);
        this.setCarouselTransition(current)
    }

    changeNumberText(btn, isForward = true) {
        const numText = this.textElem.innerText.split(' / ');
        const cardsLength = this.carousel.querySelectorAll('.carousel-card').length;
        const newText = this.getNumText(numText, cardsLength, isForward);
        this.textElem.innerHTML = newText.join(' / ')
        this.setDisabled(newText[0], cardsLength)
        this.setCarouselTransition(newText[0])
        if (isForward) {

            this.carousel.classList.remove('backward');
            this.carousel.classList.add('forward');
        } else {
            this.carousel.classList.remove('forward');
            this.carousel.classList.add('backward');
        }

    }
}

export default Carousel;
