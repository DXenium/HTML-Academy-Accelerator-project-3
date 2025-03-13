import Swiper from 'swiper';
import { Navigation, Grid, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/grid';
import 'swiper/css/pagination';

//   let slidesPerViewCount; //Количество слайдов, видимых одновременно
//   let activeIndex;

//   // Определяем slidesPerViewCount в зависимости от ширины экрана
//   if (window.innerWidth <= 320) {
//     slidesPerViewCount = 1;
//     activeIndex = newsSlider.activeIndex;
//   } else if (window.innerWidth >= 768 && window.innerWidth < 1440) {
//     slidesPerViewCount = 2;
//     activeIndex = Math.ceil(newsSlider.activeIndex / 2);
//   } else if (window.innerWidth >= 1440) {
//     slidesPerViewCount = 3;
//     activeIndex = Math.ceil(newsSlider.activeIndex / 3);
//   }

//   // Вычисляем общее количество слайдов и кнопок пагинации
//   const totalSlides = newsSlider.slides.length;
//   const totalPaginationButtons = Math.ceil(totalSlides / slidesPerViewCount);
//   const paginationBullets = newsSlider.pagination.bullets;

//   if (!paginationBullets) return; // Проверка на наличие элементов пагинации

//   // Определяем диапазон видимых кнопок
//   let startPaginationIndex = Math.max(0, activeIndex - 2); // Начинаем с activeIndex - 2
//   let endPaginationIndex = Math.min(totalPaginationButtons - 1, activeIndex + 1); // Заканчиваем на activeIndex + 1

//  if (activeIndex === totalPaginationButtons - 2) { // Если активный слайд на предпоследней позиции
//   startPaginationIndex = Math.max(0, totalPaginationButtons - 4); // Показываем последние 4 кнопки
//   endPaginationIndex = totalPaginationButtons - 1;
// } else if (endPaginationIndex - startPaginationIndex < 3) {
//   if (activeIndex < 2) {
//     // Если активный слайд близок к началу, показываем первые 4 кнопки
//     startPaginationIndex = 0;
//     endPaginationIndex = Math.min(3, totalPaginationButtons - 1);
//   } else if (activeIndex >= totalPaginationButtons - 3) {
//     // Если активный слайд близок к концу, показываем последние 4 кнопки
//     startPaginationIndex = Math.max(0, totalPaginationButtons - 4);
//     endPaginationIndex = totalPaginationButtons - 1;
//   }
// }

//   // Показываем/скрываем кнопки пагинации
//   paginationBullets.forEach((bullet, index) => {
//     if (index >= startPaginationIndex && index <= endPaginationIndex) {
//       bullet.classList.remove('news__pagination-button--hidden');

//     } else {
//       bullet.classList.add('news__pagination-button--hidden');
//     }
//   });
// };

// Инициализация Swiper
const VISIBLE_BULLETS = 4;
let lastSavedCurrentGroup = 0;

const updatePagination = (swiper) => {
  const totalSlides = swiper.slides.length;
  const slidesPerGroup = swiper.params.slidesPerGroup;
  let totalGroups;

  const groups = Math.ceil(totalSlides / slidesPerGroup);
  if (window.matchMedia('(max-width: 1439px)').matches) {
    totalGroups = Math.ceil(groups / 2);
  } else {
    totalGroups = groups;
  }
  const currentGroup = Math.floor(swiper.activeIndex / slidesPerGroup) + 1;
  const prevGroup = (typeof swiper.prevGroup !== 'undefined') ? swiper.prevGroup : currentGroup;
  const direction = currentGroup > prevGroup ? 'forward' : 'backward';
  swiper.prevGroup = currentGroup;

  const bullets = document.querySelectorAll('.news__pagination-button');
  bullets.forEach((bullet) => {
    bullet.style.display = 'none';
  });

  let visibleIndexes = [];

  if (totalGroups <= VISIBLE_BULLETS) {
    visibleIndexes = Array.from({ length: totalGroups }, (_, i) => i + 1);
  } else {
    let start;
    if (direction === 'forward') {
      start = currentGroup - 2;
    } else {
      start = currentGroup - 1;
    }

    if (start < 1) {
      start = 1;
    }

    if (start + VISIBLE_BULLETS - 1 > totalGroups) {
      start = Math.max(1, totalGroups - (VISIBLE_BULLETS - 1));
    }

    visibleIndexes = [start, start + 1, start + 2, start + 3];
  }

  visibleIndexes.forEach((i) => {
    const bullet = document.querySelector(`.news__pagination-button--${i - 1}`);
    if (bullet) {
      bullet.style.display = 'flex';
    }
  });
};

const newsSlider = new Swiper('.news__swiper', {
  modules: [Navigation, Grid, Pagination],
  direction: 'horizontal',
  initialSlide: lastSavedCurrentGroup,
  a11y: {
    prevSlideMessage: 'Предыдущий слайд',
    nextSlideMessage: 'Следующий слайд',
  },
  navigation: {
    nextEl: '.news__slider-button--next',
    prevEl: '.news__slider-button--prev',
  },
  pagination: {
    el: '.news__custom-pagination',
    bulletClass: 'news__pagination-button',
    clickable: true,
    bulletActiveClass: 'news__pagination-button--active',
    renderBullet: function (index, className) {
      return `<button class="news__pagination-button news__pagination-button--${index} ${className}" type="button" aria-label="Перейти к ${index + 1} слайду" tabindex = '0'>${index + 1}</button>`;
    }
  },
  slideClass: 'news__slide',
  wrapperClass: 'news__swiper-wrapper',
  loop: false,
  updateOnWindowResize: true,
  touchRatio: 1,
  touchAngle: 45,
  slidesPerView: 1, // По умолчанию для мобильных
  slidesPerGroup: 1, // Количество слайдов для прокрутки
  initialSlide: 0,
  spaceBetween: 20,
  autoHeight: false, // Отключаем автоматическую высоту
  grid: {
    rows: 2, // По умолчанию ряды
  },
  breakpoints: {
    320: {
      grid: {
        rows: 2, // 2 ряда на мобильных
        fill: 'column',
      },
      allowTouchMove: true,
    },
    768: {
      slidesPerView: 2,
      allowTouchMove: true,
      slidesPerGroup: 2,
      grid: {
        rows: 2, // 2 ряда на планшетах
        fill: 'row',
      },
      spaceBetween: 30,
    },
    1440: {
      slidesPerView: 'auto',
      slidesPerGroup: 3,
      spaceBetween: 32,
      allowTouchMove: false,
      grid: {
        rows: 1,
        fill: 'row',
      },
    },
  },
  on: {
    init: function () {
      updatePagination(this);
    },
    resize: function () {
      updatePagination(this);
    },
    slideChange: function() {
      updatePagination(this);
      lastSavedCurrentGroup = this.activeIndex;
    }
  }
});
