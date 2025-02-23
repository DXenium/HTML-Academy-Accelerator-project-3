import Swiper from 'swiper';
import { Navigation, Grid } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/grid';

// Создаем кастомную пагинацию
const customPagination = document.querySelector('.news__custom-pagination');

// Функции для пагинации
let createPaginationBullets;
let updatePagination;

if (customPagination) {
  createPaginationBullets = (swiper) => {
    customPagination.innerHTML = ''; // Очищаем пагинацию

    // Получаем реальное количество слайдов из Swiper
    const totalSlides = swiper.slides.length;

    for (let i = 0; i < totalSlides; i++) {
      const bullet = document.createElement('span'); // Создаём элемент <span>
      bullet.classList.add('pagination-bullet'); // Добавляем класс для стилей
      bullet.dataset.index = i; // Устанавливаем data-атрибут с индексом слайда
      bullet.textContent = i + 1; // Выводим номер слайда (начиная с 1)
      bullet.setAttribute('aria-label', `перейти к слайду ${i + 1}`);
      bullet.setAttribute('role', 'button');
      bullet.setAttribute('tabindex', '0');

      // Добавляем обработчик клика для перехода к слайду
      bullet.addEventListener('click', () => {
        swiper.slideTo(i); // Переход к соответствующему слайду
      });

      // Добавляем обработчик нажатия клавиш (Enter или Space)
      bullet.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          swiper.slideTo(i);
        }
      });

      customPagination.appendChild(bullet); // Добавляем элемент в контейнер пагинации
    }

    // Изначально показываем первые 4 кнопки, если слайдов больше 4
    if (totalSlides > 4) {
      const bullets = document.querySelectorAll('.pagination-bullet');
      bullets.forEach((bullet, index) => {
        bullet.style.display = index < 4 ? 'flex' : 'none';
      });
    }
  };

  updatePagination = (swiper) => {
    const bullets = document.querySelectorAll('.pagination-bullet');
    const activeIndex = swiper.activeIndex;
    const totalSlides = swiper.slides.length;

    if (totalSlides <= 4) {
      // Если слайдов 4 или меньше, показываем все кнопки
      bullets.forEach((bullet) => (bullet.style.display = 'flex'));
    } else {
      // Если слайдов больше 4, обновляем видимые кнопки
      let start = Math.max(0, activeIndex - 2);
      let end = Math.min(totalSlides - 1, activeIndex + 1);

      if (activeIndex <= 2) {
        start = 0;
        end = 3;
      } else if (activeIndex >= totalSlides - 2) {
        start = totalSlides - 4;
        end = totalSlides - 1;
      }

      // Скрываем все кнопки
      bullets.forEach((bullet) => (bullet.style.display = 'none'));

      // Показываем кнопки в диапазоне
      for (let i = start; i <= end; i++) {
        bullets[i].style.display = 'flex';
      }
    }

    // Обновляем активную кнопку
    bullets.forEach((bullet) => bullet.classList.remove('pagination-bullet-active'));
    bullets[activeIndex]?.classList.add('pagination-bullet-active');
  };
}

// Инициализация Swiper
new Swiper('.news__swiper', {
  modules: [Navigation, Grid],
  direction: 'horizontal',
  a11y: {
    prevSlideMessage: 'Предыдущий слайд',
    nextSlideMessage: 'Следующий слайд',
  },
  navigation: {
    nextEl: '.news__slider-button--next',
    prevEl: '.news__slider-button--prev',
  },
  loop: false,
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
    },
    768: {
      slidesPerView: 2,
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
      grid: {
        rows: 1,
        fill: 'row',
      },
    },
  },
  on: {
    init: function () {
      if (customPagination && createPaginationBullets) {
        createPaginationBullets(this);
      }
      if (customPagination && updatePagination) {
        updatePagination(this);
      }
    },
    slideChange: function () {
      if (customPagination && updatePagination) {
        updatePagination(this);
      }
    },
  },
});
