// import Swiper JS
import Swiper from 'swiper';
import { Scrollbar, Navigation } from 'swiper/modules';

// import Swiper and modules styles
import 'swiper/css';
import 'swiper/css/scrollbar';
import 'swiper/css/navigation';


const swiper = new Swiper('.reviews__swiper', {
  modules: [Navigation, Scrollbar],

  direction: 'horizontal',
  a11y: {
    prevSlideMessage: 'Предыдущий слайд',
    nextSlideMessage: 'Следующий слайд',
  },
  // Navigation arrows
  navigation: {
    nextEl: '.reviews__slider-button--next',
    prevEl: '.reviews__slider-button--prev',
  },
  scrollbar: {
    el: '.reviews__scrollbar',
    draggable: true,
  },

  loop: false,
  touchRatio: 1,
  touchAngle: 45,
  slidesPerView: 2, // Количество видимых слайдов
  slidesPerGroup: 1, // Количество слайдов для прокрутки
  initialSlide: 0,
  spaceBetween: 30,

  breakpoints: {
    320: {
      slidesPerView: 1,
      grabCursor: true,
      simulateTouch: true,
    },
    768: {
      slidesPerView: 1.275,
      grabCursor: true,
      simulateTouch: true,
    },
    1440: {
      slidesPerView: 2,
      grabCursor: false,
      simulateTouch: false,
      spaceBetween: 32,
    }
  }
});

