import Swiper from 'swiper';
import { Navigation, Grid } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/grid';

// Функции для обновления параметров
const setSlideHeights = (swiper) => {
  if (window.matchMedia('(max-width: 320px)').matches) {
    swiper.slides.forEach((slide, index) => {
      if (index % 2 === 0) {
        slide.style.height = '330px'; // Нечётные слайды
      } else {
        slide.style.height = '240px'; // Чётные слайды
      }
    });
  }
};

const marginTopReset = (swiper) => {
  if (window.matchMedia('(min-width: 768px)').matches) {
    swiper.slides.forEach((slide, index) => {
      if (index % 2 !== 0) { // Чётные слайды (индексы 1, 3, 5, ...)
        slide.style.marginTop = '0'; // Сбрасываем margin-top
      }
    });
  }
};

const updateSlideWidths = (swiper) => {
  if (window.matchMedia('(min-width: 1440px)').matches) {
    swiper.slides.forEach((slide) => {
      slide.style.width = '286px'; // Ширина по умолчанию
    });
    if (swiper.slides[swiper.activeIndex]) {
      swiper.slides[swiper.activeIndex].style.width = '604px'; // Ширина активного слайда
    }
  }
};

// Общая функция для обновления всех параметров
const updateAll = (swiper) => {
  setSlideHeights(swiper);
  marginTopReset(swiper);
  updateSlideWidths(swiper);
};

// Оптимизация обработки resize с использованием debounce
const debounce = (func, delay) => {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), delay);
  };
};

// Создаем кастомную пагинацию
const customPagination = document.querySelector('.news__custom-pagination');

// Функции для пагинации
let createPaginationBullets;
let updatePagination;

if (customPagination) {
  const totalSlides = 10;

  createPaginationBullets = (swiper) => {
    customPagination.innerHTML = ''; // Очищаем пагинацию

    // Получаем реальное количество слайдов из Swiper
    const totalSlides = swiper.slides.length;

    for (let i = 0; i < totalSlides; i++) {
      const bullet = document.createElement('span'); // Создаём элемент <span>
      bullet.classList.add('pagination-bullet'); // Добавляем класс для стилей
      bullet.dataset.index = i; // Устанавливаем data-атрибут с индексом слайда
      bullet.textContent = i + 1; // Выводим номер слайда (начиная с 1)

      // Добавляем обработчик клика для перехода к слайду
      bullet.addEventListener('click', () => {
        swiper.slideTo(i); // Переход к соответствующему слайду
      });

      customPagination.appendChild(bullet); // Добавляем элемент в контейнер пагинации
    }
  };

  updatePagination = (swiper) => {
    const bullets = document.querySelectorAll('.pagination-bullet');
    const activeIndex = swiper.activeIndex;

    // Скрываем все кнопки
    bullets.forEach((bullet) => (bullet.style.display = 'none'));

    // Определяем диапазон видимых кнопок
    let start = Math.max(0, activeIndex - 2);
    let end = Math.min(totalSlides - 1, activeIndex + 1);

    if (activeIndex <= 2) {
      start = 0;
      end = Math.min(3, totalSlides - 1);
    } else if (activeIndex >= totalSlides - 2) {
      start = Math.max(totalSlides - 4, 0);
      end = totalSlides - 1;
    }

    // Показываем кнопки в диапазоне
    for (let i = start; i <= end; i++) {
      bullets[i].style.display = 'flex';
    }

    // Обновляем активную кнопку
    bullets.forEach((bullet) => bullet.classList.remove('pagination-bullet-active'));
    bullets[activeIndex]?.classList.add('pagination-bullet-active');
  };
}

// Инициализация Swiper
const swiper = new Swiper('.news__swiper', {
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
    rows: 1, // По умолчанию ряды
  },
  breakpoints: {
    320: {
      grid: {
        rows: 2, // 2 ряда на мобильных
      },
    },
    768: {
      slidesPerView: 2,
      grid: {
        rows: 2, // 2 ряда на планшетах
      },
      spaceBetween: 30,
    },
    1440: {
      slidesPerView: 'auto', // Разная ширина слайдов
      spaceBetween: 32,
    },
  },
  on: {
    init: function () {
      updateAll(this); // Обновляем все параметры при инициализации
      if (customPagination && createPaginationBullets) createPaginationBullets(this);
      if (customPagination && updatePagination) updatePagination(this);
    },
    slideChange: function () {
      updateAll(this); // Обновляем все параметры при смене слайдов
      if (customPagination && updatePagination) updatePagination(this);
    },
  },
});

// Обработчик изменения размера окна
const handleResize = debounce(() => {
  if (swiper) {
    updateAll(swiper); // Обновляем параметры только если swiper существует
  }
}, 100); // Задержка 100 мс

// Добавляем обработчик события resize
window.addEventListener('resize', handleResize);
