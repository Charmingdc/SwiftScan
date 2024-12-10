'use strict';


// import helper function
import { getElement } from './getElement.ts';


export const renderQrCode = async (qrUrl: string): void => {
  const qrCodeWrapper = getElement < HTMLElement > ('qrcode-wrapper', 'id');
  const img = getElement < HTMLImageElement > ('qrcode-img', 'id');
  const downloadBtn = getElement < HTMLAnchorElement > ('download-btn', 'id');


  try {
    qrCodeWrapper.style.display = 'flex';
    
    // set img src to the qr code url
    img.src = `${qrUrl}`;
    
    // set the download link to the qr code url
    downloadBtn.href = `${qrUrl}`;
  } catch (err) {
    console.error('Failed to render qr code:', err.mesaage);
  }
};