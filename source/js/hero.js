// import Swiper JS
import Swiper from 'swiper';
import { Pagination } from 'swiper/modules';

// import Swiper and modules styles
import 'swiper/css';
import 'swiper/css/pagination';


// Функция для обновления позиции .hero__bulit-wrapper
function updateBulletPosition() {
  const heroContent = document.querySelector('.hero__content');
  const bulletWrapper = document.querySelector('.hero__bulit-wrapper');

  if (heroContent && bulletWrapper) {
    // Получаем координаты .hero__content относительно viewport
    const heroContentRect = heroContent.getBoundingClientRect();

    // Получаем высоту .hero__bulit-wrapper
    const bulletWrapperHeight = bulletWrapper.offsetHeight;

    // Устанавливаем top для .hero__bulit-wrapper, учитывая его высоту
    bulletWrapper.style.top = `${heroContentRect.top - bulletWrapperHeight + 1}px`;
  }
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

// Инициализация Swiper
const heroSlider = new Swiper('.hero__swiper', {
  modules: [Pagination],
  pagination: {
    el: '.hero__bulit-wrapper',
    clickable: true,
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
      // Обновляем позицию при инициализации
      throttledUpdateBulletPosition();
    },
    slideChange: function () {
      // Обновляем позицию при смене слайда
      throttledUpdateBulletPosition();
    },
    touchMove: function () {
      // Обновляем позицию во время свайпа
      throttledUpdateBulletPosition();
    }
  }
});

// Обновляем позицию при изменении размера окна
window.addEventListener('resize', () => {
  throttledUpdateBulletPosition();
});
