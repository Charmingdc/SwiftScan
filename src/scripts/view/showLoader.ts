'use strict';

export const showLoader = async (status: boolean, button: HTMLButtonElement): void => {
  try {
    if (status) {
      button.innerHTML = '<div class="loader"></div>';
      button.setAttribute('disabled', 'true');
      button.classList.add('disabled');
    } else {
      button.innerHTML = 'Generate QR code';
      button.classList.remove('disabled');
      button.removeAttribute('disabled');
    }
  } catch (err) {
    console.error(err.message);
  }
};