'use strict';

// Import helper function
import { getElement } from './getElement.ts';

export const renderQrCode = async (qrUrl: string): Promise<void> => {
  const qrCodeWrapper = getElement<HTMLElement>('qrcode-wrapper', 'id');
  const img = getElement<HTMLImageElement>('qrcode-img', 'id');
  const downloadBtn = getElement<HTMLAnchorElement>('download-btn', 'id');

  try {
    if (qrCodeWrapper) qrCodeWrapper.style.display = 'flex';

    // Set img src to the QR code URL
    if (img) img.src = qrUrl;

    // Set the download link to the QR code URL
    if (downloadBtn) downloadBtn.href = qrUrl;
  } catch (err) {
    console.error('Failed to render QR code:', (err as Error).message);
  }
};