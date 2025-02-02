const openButton = document.querySelector('.about__button');
const popupContainer = document.querySelector('.modal__container');
const popupCross = popupContainer.querySelector('.modal__close-button');

openButton.addEventListener('click', () => {
  popupContainer.style.display = 'block';
  createOverlay();
});

popupCross.addEventListener('click', () => {
  closePopup();
});

// Закрытие попапа при нажатии на ESC
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closePopup();
  }
});

// Создание оверлея
function createOverlay() {
  let overlay = document.querySelector('.overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.classList.add('overlay');
    overlay.addEventListener('click', () => {
      closePopup(); // Закрываем попап при клике на оверлей
    });
    document.body.appendChild(overlay);
  }
}

// Удаление оверлея
function removeOverlay() {
  const overlay = document.querySelector('.overlay');
  if (overlay) {
    overlay.remove();
  }
}

function closePopup() {
  popupContainer.style.display = 'none';
  removeOverlay();
}
