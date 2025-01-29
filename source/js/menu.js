const button = document.querySelector('.menu__button');
const menu = document.querySelector('.menu__list');
const menuLinks = document.querySelectorAll('.menu__link');
const submenuButtons = document.querySelectorAll('.submenu');
const submenuLinks = document.querySelectorAll('.submenu__link');
const body = document.querySelector('.page__body');

// Обработчик для основного меню
button.addEventListener('click', (e) => {
  e.stopPropagation(); // Останавливаем всплытие, чтобы клик на кнопку не закрывал меню
  button.classList.toggle('active');

  if (button.classList.contains('active')) {
    createOverlay(); // Создаем оверлей при открытии меню
    button.setAttribute('aria-expanded', 'true');
    menu.setAttribute('aria-hidden', 'false');
    menuLinks.forEach(link => link.setAttribute('tabindex', '0'));
  } else {
    closeMenu(); // Закрываем меню и удаляем оверлей
  }
});

// Обработчики для подменю
submenuButtons.forEach(submenuButton => {
  submenuButton.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation(); // Останавливаем всплытие, чтобы клик на подменю не закрывал меню
    submenuButton.classList.toggle('active');
    const submenu = submenuButton.nextElementSibling;
    const isExpanded = submenuButton.getAttribute('aria-expanded') === 'true';

    // Переключаем состояние подменю
    submenuButton.setAttribute('aria-expanded', !isExpanded);
    submenu.setAttribute('aria-hidden', isExpanded);

    // Управляем видимостью подменю через стили
    if (!isExpanded) {
      submenuButton.setAttribute('aria-expanded', 'true');
      submenu.setAttribute('aria-hidden', 'false');
      submenuLinks.forEach(link => link.setAttribute('tabindex', '0'));
    } else {
      submenuButton.setAttribute('aria-expanded', 'false');
      submenu.setAttribute('aria-hidden', 'true');
      submenuLinks.forEach(link => link.setAttribute('tabindex', '-1'));
    }
  });
});

// Создание оверлея
function createOverlay() {
  const overlay = document.createElement('div');
  overlay.classList.add('overlay');
  overlay.addEventListener('click', () => {
    closeMenu(); // Закрываем меню при клике на оверлей
  });
  document.body.appendChild(overlay);
}

// Удаление оверлея
function removeOverlay() {
  const overlay = document.querySelector('.overlay');
  if (overlay) {
    overlay.remove();
  }
}

// Закрытие меню и подменю
function closeMenu() {
  // Закрываем основное меню
  button.classList.remove('active');
  button.setAttribute('aria-expanded', 'false');
  menu.setAttribute('aria-hidden', 'true');
  menuLinks.forEach(link => link.setAttribute('tabindex', '-1'));

  // Закрываем все подменю
  submenuButtons.forEach(submenuButton => {
    submenuButton.classList.remove('active');
    submenuButton.setAttribute('aria-expanded', 'false');
    const submenu = submenuButton.nextElementSibling;
    if (submenu) {
      submenu.setAttribute('aria-hidden', 'true');
      submenuLinks.forEach(link => link.setAttribute('tabindex', '-1'));
    }
  });

  // Удаляем оверлей
  removeOverlay();
}

// Закрытие меню при клике вне навигации
document.addEventListener('click', (e) => {
  const isClickInsideMenu = menu.contains(e.target) || button.contains(e.target);
  if (!isClickInsideMenu) {
    closeMenu();
  }
});