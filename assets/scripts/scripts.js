import Carousel from './components/carousel.js';

document.addEventListener('DOMContentLoaded', () => {
    const carousel = new Carousel(
        document.querySelector('.carousel-wrapper'), 
        document.querySelector('.members__carousel'), 
        document.querySelector('.carousel-controls'), 
        document.querySelector('.carousel-controls__text')
    );
    carousel.init();
});
