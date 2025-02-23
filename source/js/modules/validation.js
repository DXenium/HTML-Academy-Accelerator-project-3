document.addEventListener('DOMContentLoaded', () => {
  // Функция для валидации формы
  function validateForm(form) {
    let isFormValid = true;

    // Проверяем все текстовые поля, поля телефона, textarea и селекты
    const inputs = form.querySelectorAll('input[type="text"], input[type="tel"], textarea, select');
    inputs.forEach((input) => {
      let isValid = true;

      if (input.tagName === 'SELECT') {
        // Проверяем, что выбрано не первое значение
        if (input.selectedIndex === 0) { // Первое значение (пустое) недопустимо
          isValid = false;
        }
      } else {
        // Для остальных полей используем стандартную валидацию
        if (!input.validity.valid) {
          isValid = false;
        }
      }

      if (!isValid) {
        input.reportValidity(); // Показываем стандартное сообщение об ошибке
        input.classList.add('error'); // Добавляем класс ошибки
        isFormValid = false;
      } else {
        input.classList.remove('error'); // Убираем класс ошибки
      }
    });

    // Проверяем чекбокс
    const checkbox = form.querySelector('input[type="checkbox"]');
    if (checkbox && !checkbox.checked) {
      checkbox.classList.add('error');
      isFormValid = false;
    } else if (checkbox) {
      checkbox.classList.remove('error');
    }

    return isFormValid;
  }

  // Функция для очистки формы
  function resetForm(form) {
    form.reset(); // Сбрасываем форму
    form.querySelectorAll('.error').forEach((element) => {
      element.classList.remove('error'); // Убираем классы ошибок
    });
  }

  // Обработчик для всех форм на странице
  document.querySelectorAll('form').forEach((form) => {
    form.addEventListener('submit', (event) => {
      event.preventDefault(); // Предотвращаем отправку формы

      if (validateForm(form)) {
        form.submit();
        resetForm(form); // Очищаем поля формы
        closePopup(); // Закрываем модальное окно
      } else {
        form.reportValidity();
      }
    });

    // Убираем класс ошибки при изменении значения текстовых полей и textarea
    form.querySelectorAll('input[type="text"], input[type="tel"], textarea').forEach((input) => {
      input.addEventListener('input', function () {
        if (this.value.trim()) {
          this.classList.remove('error');
        }
      });
    });

    // Убираем класс ошибки при изменении значения селекта
    form.querySelectorAll('select').forEach((select) => {
      select.addEventListener('change', function () {
        if (this.selectedIndex > 0) { // Если выбрано не первое значение
          this.classList.remove('error'); // Убираем класс ошибки
        } else {
          this.classList.add('error'); // Добавляем класс ошибки, если выбрано первое значение
        }
      });
    });

    // Убираем класс ошибки при изменении состояния чекбокса
    const checkbox = form.querySelector('input[type="checkbox"]');
    if (checkbox) {
      checkbox.addEventListener('change', function () {
        if (this.checked) {
          this.classList.remove('error');
        } else {
          this.classList.add('error');
        }
      });
    }

    // Обработка кастомного селекта
    const customSelects = form.querySelectorAll('.select__custom--js');
    customSelects.forEach((customSelect) => {
      const customOptions = customSelect.querySelectorAll('.select__custom-option');
      const nativeSelect = customSelect.previousElementSibling; // Нативный <select>

      customOptions.forEach((option) => {
        option.addEventListener('click', function () {
          const selectedValue = this.getAttribute('data-value');
          nativeSelect.value = selectedValue; // Обновляем значение нативного <select>

          // Триггерим событие change для нативного <select>
          const event = new Event('change', { bubbles: true });
          nativeSelect.dispatchEvent(event);
        });
      });
    });
  });
});
