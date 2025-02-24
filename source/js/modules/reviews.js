// import Swiper JS
import Swiper from 'swiper';
import { Scrollbar, Navigation } from 'swiper/modules';

// import Swiper and modules styles
import 'swiper/css';
import 'swiper/css/scrollbar';
import 'swiper/css/navigation';

new Swiper('.reviews__swiper', {
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
      spaceBetween: 29,
    },
    1440: {
      slidesPerView: 2,
      grabCursor: false,
      simulateTouch: false,
      spaceBetween: 32,
    }
  },
  on: {
    afterInit: function () {
      checkAndCloneSlides(this);
    },
    resize: function () {
      checkAndCloneSlides(this);
    }
  }
});

function checkAndCloneSlides(swiper) {
  const slides = swiper.slides;
  const minSlidesRequired = 6; // Минимальное количество слайдов для планшетов и десктопов

  // Проверяем, что ширина экрана больше 768px (планшеты и десктопы)
  if (window.innerWidth >= 1440 && slides.length < minSlidesRequired) {
    const slidesToClone = minSlidesRequired - slides.length;

    for (let i = 0; i < slidesToClone; i++) {
      const clone = slides[i % slides.length].cloneNode(true);
      swiper.wrapperEl.appendChild(clone);
    }

    // Обновляем Swiper после добавления новых слайдов
    swiper.update();
  }
}
