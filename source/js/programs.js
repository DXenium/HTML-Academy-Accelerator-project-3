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
  loop: false,
  touchRatio: 1,
  touchAngle: 45,
  slidesPerView: 1,
  slidesPerGroup: 1,
  initialSlide: 0,
  spaceBetween: 30,

  breakpoints: {
    320: {
      slidesPerView: 1,
      grabCursor: true,
      simulateTouch: true,
    },
    1440: {
      slidesPerView: 1,
      grabCursor: false,
      simulateTouch: false,
    }
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  // And if we need scrollbar
  scrollbar: {
    el: '.swiper-scrollbar',
  },
});
