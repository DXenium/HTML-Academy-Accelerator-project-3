document.addEventListener('DOMContentLoaded', () => {
  const phoneInputs = document.querySelectorAll('input[type="tel"]');
  const phoneMask = '+7(___) ___-__-__'; // Маска для телефона

  function applyPhoneMask(event) {
    const input = event.target;

    // Сохраняем текущую позицию курсора
    const start = input.selectionStart;

    let value = input.value.replace(/\D/g, '').substring(0, 11); // Ограничиваем до 11 цифр

    // Если первая цифра не "7", заменяем её на "7"
    if (value.length > 0 && value[0] !== '7') {
      value = `7${ value.substring(1)}`;
    }

    let formattedValue = '';

    if (value.length > 0) {
      formattedValue = '+7';
    }
    if (value.length > 1) {
      formattedValue += ` (${ value.substring(1, 4)}`;
    }
    if (value.length > 4) {
      formattedValue += `) ${ value.substring(4, 7)}`;
    }
    if (value.length > 7) {
      formattedValue += `-${ value.substring(7, 9)}`;
    }
    if (value.length > 9) {
      formattedValue += `-${ value.substring(9, 11)}`;
    }

    if (value.length === 0) {
      // Если поле пустое, показываем маску
      input.value = phoneMask;
      return;
    }

    input.value = formattedValue;

    // Восстанавливаем позицию курсора
    const newCursorPosition = Math.min(start + 1, formattedValue.length);
    input.setSelectionRange(newCursorPosition, newCursorPosition);
  }

  function handlePaste(event) {
    event.preventDefault();
    const input = event.target;
    const pastedText = (event.clipboardData || window.clipboardData).getData('text');
    let cleanedText = pastedText.replace(/\D/g, '').substring(0, 11); // Ограничиваем до 11 цифр

    // Если первая цифра не "7", заменяем её на "7"
    if (cleanedText.length > 0 && cleanedText[0] !== '7') {
      cleanedText = `7${ cleanedText.substring(1)}`;
    }

    let formattedValue = '';
    if (cleanedText.length > 0) {
      formattedValue = '+7';
    }
    if (cleanedText.length > 1) {
      formattedValue += ` (${ cleanedText.substring(1, 4)}`;
    }
    if (cleanedText.length > 4) {
      formattedValue += `) ${ cleanedText.substring(4, 7)}`;
    }
    if (cleanedText.length > 7) {
      formattedValue += `-${ cleanedText.substring(7, 9)}`;
    }
    if (cleanedText.length > 9) {
      formattedValue += `-${ cleanedText.substring(9, 11)}`;
    }

    input.value = formattedValue;
  }

  function showMaskOnFocus(event) {
    const input = event.target;

    // Если поле пустое, показываем маску
    if (input.value.trim() === '') {
      input.value = phoneMask;

      // Устанавливаем курсор после "+7"
      input.setSelectionRange(3, 3);
    }
  }

  function clearMaskOnInput(event) {
    const input = event.target;

    // Если значение равно маске, очищаем поле для ввода
    if (input.value === phoneMask) {
      input.value = '';
    }
  }

  phoneInputs.forEach((input) => {
    input.addEventListener('input', applyPhoneMask);
    input.addEventListener('paste', handlePaste);
    input.addEventListener('focus', showMaskOnFocus); // Показываем маску при фокусе
    input.addEventListener('input', clearMaskOnInput); // Очищаем маску при вводе
  });
});
