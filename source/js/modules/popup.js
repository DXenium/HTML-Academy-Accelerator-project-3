const openButton = document.querySelector('.about__button');
const popupContainer = document.querySelector('.modal');
const popupCross = popupContainer.querySelector('.modal__close-button');

let scrollPosition = 0;

function smoothScrollTo(position) {
  requestAnimationFrame(() => {
    window.scrollTo(0, position);
  });
}

// Открытие модального окна
openButton.addEventListener('click', () => {
  scrollPosition = window.scrollY;
  popupContainer.style.display = 'flex'; // Показываем модальное окно
  document.body.classList.add('modal-open');
  document.body.style.top = `-${scrollPosition}px`; // Сдвигаем body вверх
});

// Закрытие модального окна
function closePopup() {
  popupContainer.style.display = 'none'; // Скрываем модальное окно
  document.body.classList.remove('modal-open');
  document.body.style.top = ''; // Сбрасываем значение top
  smoothScrollTo(scrollPosition); // Возвращаем сохраненную позицию
}

// Обработчик закрытия по крестику
popupCross.addEventListener('click', closePopup);

// Закрытие попапа при нажатии на ESC
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    event.preventDefault(); // Отменяем стандартное действие браузера
    closePopup();
  }
});

// Закрытие попапа при клике на overlay
document.addEventListener('click', (event) => {
  if (event.target === popupContainer) {
    closePopup(); // Закрываем модальное окно, если кликнули на оверлей
  }
});
