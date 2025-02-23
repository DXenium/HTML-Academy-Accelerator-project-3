function initializeCustomSelect(selectNative, selectCustom) {
  const elSelectCustomBox = selectCustom.children[0];
  const elSelectCustomOpts = selectCustom.children[1];
  const customOptsList = Array.from(elSelectCustomOpts.children);
  const optionsCount = customOptsList.length;

  let optionChecked = '';
  let optionHoveredIndex = -1;

  // Toggle custom select visibility when clicking the box
  elSelectCustomBox.addEventListener('click', () => {
    const isClosed = !selectCustom.classList.contains('is-active');

    if (isClosed) {
      openSelectCustom();
    } else {
      closeSelectCustom();
    }
  });

  function openSelectCustom() {
    selectCustom.classList.add('is-active');
    selectCustom.setAttribute('aria-hidden', false);

    if (optionChecked) {
      const optionCheckedIndex = customOptsList.findIndex(
        (el) => el.getAttribute('data-value') === optionChecked
      );
      updateCustomSelectHovered(optionCheckedIndex);
    }

    document.addEventListener('click', watchClickOutside);
    document.addEventListener('keydown', supportKeyboardNavigation);
  }

  function closeSelectCustom() {
    selectCustom.classList.remove('is-active');
    selectCustom.setAttribute('aria-hidden', true);
    updateCustomSelectHovered(-1);

    document.removeEventListener('click', watchClickOutside);
    document.removeEventListener('keydown', supportKeyboardNavigation);
  }

  function updateCustomSelectHovered(newIndex) {
    const prevOption = elSelectCustomOpts.children[optionHoveredIndex];
    const option = elSelectCustomOpts.children[newIndex];

    if (prevOption) {
      prevOption.classList.remove('is-hover');
    }
    if (option) {
      option.classList.add('is-hover');
    }

    optionHoveredIndex = newIndex;
  }

  function updateCustomSelectChecked(value, text) {
    const prevValue = optionChecked;

    const elPrevOption = elSelectCustomOpts.querySelector(
      `[data-value="${prevValue}"`
    );
    const elOption = elSelectCustomOpts.querySelector(`[data-value="${value}"`);

    if (elPrevOption) {
      elPrevOption.classList.remove('is-active');
    }

    if (elOption) {
      elOption.classList.add('is-active');
    }

    elSelectCustomBox.textContent = text;
    optionChecked = value;
  }

  function watchClickOutside(e) {
    const didClickedOutside = !selectCustom.contains(e.target);
    if (didClickedOutside) {
      closeSelectCustom();
    }
  }

  function supportKeyboardNavigation(e) {
    if (e.keyCode === 40 && optionHoveredIndex < optionsCount - 1) {
      e.preventDefault();
      updateCustomSelectHovered(optionHoveredIndex + 1);
    }

    if (e.keyCode === 38 && optionHoveredIndex > 0) {
      e.preventDefault();
      updateCustomSelectHovered(optionHoveredIndex - 1);
    }

    if (e.keyCode === 13 || e.keyCode === 32) {
      e.preventDefault();

      const option = elSelectCustomOpts.children[optionHoveredIndex];
      const value = option && option.getAttribute('data-value');

      if (value) {
        selectNative.value = value;
        updateCustomSelectChecked(value, option.textContent);
      }
      closeSelectCustom();
    }

    if (e.keyCode === 27) {
      closeSelectCustom();
    }
  }

  selectNative.addEventListener('change', (e) => {
    const value = e.target.value;
    const elRespectiveCustomOption = elSelectCustomOpts.querySelectorAll(
      `[data-value="${value}"]`
    )[0];

    updateCustomSelectChecked(value, elRespectiveCustomOption.textContent);
  });

  customOptsList.forEach((elOption, index) => {
    elOption.addEventListener('click', (e) => {
      const value = e.target.getAttribute('data-value');

      selectNative.value = value;
      updateCustomSelectChecked(value, e.target.textContent);
      closeSelectCustom();
    });

    elOption.addEventListener('mouseenter', () => {
      updateCustomSelectHovered(index);
    });
  });
}

// Инициализация для первой формы
const elSelectNative1 = document.getElementsByClassName('select__native--js')[0];
const elSelectCustom1 = document.getElementsByClassName('select__custom--js')[0];
initializeCustomSelect(elSelectNative1, elSelectCustom1);

// Инициализация для второй формы
const elSelectNative2 = document.getElementsByClassName('select__native--js')[1];
const elSelectCustom2 = document.getElementsByClassName('select__custom--js')[1];
initializeCustomSelect(elSelectNative2, elSelectCustom2);
