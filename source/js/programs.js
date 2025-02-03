// import Swiper JS
import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';
import { Scrollbar } from 'swiper/modules';


// import Swiper and modules styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';


const swiper = new Swiper('.programs__swiper', {
  modules: [Navigation],
  modules: [Scrollbar],

  direction: 'horizontal',
  a11y: {
    prevSlideMessage: 'Предыдущий слайд',
    nextSlideMessage: 'Следующий слайд',
  },
  scrollbar: {
    el: '.swiper-scrollbar',
    draggable: true,
  },
  // Navigation arrows
  navigation: {
    nextEl: '.programs__slider-button--next',
    prevEl: '.programs__slider-button--prev',
  },

  loop: false,
  touchRatio: 1,
  touchAngle: 45,
  slidesPerView: 3, // Количество видимых слайдов
  slidesPerGroup: 1, // Количество слайдов для прокрутки
  initialSlide: 0,
  spaceBetween: 30,

  _breakpoints: {
    320: {
      slidesPerView: 1,
      grabCursor: true,
      simulateTouch: true,
    },
    768: {
      slidesPerView: 2.126,
      grabCursor: true,
      simulateTouch: true,
    },
    1440: {
      slidesPerView: 3,
      grabCursor: false,
      simulateTouch: false,
      spaceBetween: 32,
    }
  },
  get breakpoints() {
    return this._breakpoints;
  },
  set breakpoints(value) {
    this._breakpoints = value;
  },
});

