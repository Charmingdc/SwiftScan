'use strict';


export const generateQrUrl = async (dataType: string, data: string | number): string => {
  try {
    const baseUrl: string = 'https://www.qrickit.com/qrickit_apps/qrickit_api.php';
    const tag: string = 'SwiftScan';
    const qrSize: number = 150;
    const type: string = 'png';
    const errorCorrection: string = 'q';


    if (dataType === 'text' || dataType === 'url') {

      return `${baseUrl}?d=${data}&addText=${tag}&qrsize=${qrSize}&t=${type}&e=${errorCorrection}`;

    } else if (dataType === 'TEL') {

      return `${baseUrl}?d=${dataType}:${data}&addText=${tag}&qrsize=${qrSize}&t=${type}&e=${errorCorrection}`;

    } else if (dataType === 'MAILTO') {

      return `${baseUrl}?d=${dataType}:${data}&addText=${tag}&qrsize=${qrSize}&t=${type}&e=${errorCorrection}`;

    }
  } catch (err) {
    console.error('Failed to generate qr url:', err.message);
  }
};