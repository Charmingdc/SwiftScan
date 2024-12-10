'use strict';


// import helper function
import { getElement } from './getElement.ts';


export const renderQrCode = async (qrUrl: string): void => {
  const qrCodeWrapper = getElement < HTMLElement > ('qrcode-wrapper', 'id');
  const img = getElement < HTMLImageElement > ('qrcode-img', 'id');
  
  
  try {
    qrCodeWrapper.style.display = 'flex';
    console.log(img, qrUrl);
    img.src = `${qrUrl}`;
  } catch (err) {
    console.error('Failed to render qr code:', err.mesaage);
  }
};