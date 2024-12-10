'use strict';


export const showLoader = (status: boolean, button: HTMLButtonElement) => {

  if (status === true) {
    button.innerHTML = 'Generating...';
    button.setAttribute('disable', 'true');
    button.classList.add('disabled');
  } else if (!status) {
    button.innerHTML = 'Generate Qr code';
    button.classList.remove('disbaled');
    button.removeAttribut('disabled')
  }
};