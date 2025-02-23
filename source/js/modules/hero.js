// import Swiper JS
import Swiper from 'swiper';
import { Pagination, EffectFade } from 'swiper/modules';

// import Swiper and modules styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';


// Функция для обновления позиции .hero__bulit-wrapper
function updateBulletPosition() {
  requestAnimationFrame(() => {
    const heroContent = document.querySelector('.swiper-slide-active .hero__content');
    const bulletWrapper = document.querySelector('.hero__bullet-wrapper');

    if (heroContent && bulletWrapper) {
      // Получаем координаты .hero__content относительно viewport
      const heroContentRect = heroContent.getBoundingClientRect();
      // Получаем высоту .hero__bullet-wrapper
      const bulletWrapperHeight = bulletWrapper.offsetHeight;

      // Устанавливаем top для .hero__bullet-wrapper, учитывая его высоту
      bulletWrapper.style.top = `${heroContentRect.top - bulletWrapperHeight}px`;

      // Устанавливаем left для .hero__bullet-wrapper
      bulletWrapper.style.left = `${heroContentRect.left}px`;
    }
  });
}

let isUpdating = false;

function throttledUpdateBulletPosition() {
  if (!isUpdating) {
    isUpdating = true;
    requestAnimationFrame(() => {
      updateBulletPosition();
      isUpdating = false;
    });
  }
}

function showPagination() {
  const bulletWrapper = document.querySelector('.hero__bullet-wrapper');
  if (bulletWrapper) {
    bulletWrapper.classList.add('swiper-pagination-visible');
  }
}

function hidePgination() {
  const bulletWrapper = document.querySelector('.hero__bullet-wrapper');
  if (bulletWrapper) {
    bulletWrapper.classList.remove('swiper-pagination-visible');
  }
}

// Инициализация Swiper
new Swiper('.hero__swiper', {
  modules: [Pagination, EffectFade],
  pagination: {
    el: '.hero__bullet-wrapper',
    clickable: true,
  },
  effect: 'fade',
  fadeEffect: {
    crossFade: true
  },
  a11y: {
    prevSlideMessage: 'Предыдущий слайд',
    nextSlideMessage: 'Следующий слайд',
  },
  loop: true,
  touchRatio: 1,
  touchAngle: 45,
  slidesPerView: 1,

  breakpoints: {
    320: {
      grabCursor: true,
      simulateTouch: true,
    },
    1440: {
      grabCursor: false,
      simulateTouch: false,
    }
  },

  on: {
    init: function () {
      hidePgination();
      // Обновляем позицию при инициализации
      setTimeout(() => {
        throttledUpdateBulletPosition();
        showPagination();
      }, 50);
    },
    transitionEnd: function () {
      hidePgination();
      // Обновляем позицию при смене слайда
      setTimeout(() => {
        throttledUpdateBulletPosition();
        showPagination();
      }, 50);
    }
  }
});

// Обновляем позицию при изменении размера окна
window.addEventListener('resize', () => {
  throttledUpdateBulletPosition();
});
