'use strict';


export const generateQrUrl = async (dataType: string, data: string | number): string => {
  try {
    const baseUrl: string = 'https://qrickit.com/api/qr.php';
    const tag: string = 'SwiftScan';
    const qrSize: number = 280;
    const type: string = 'png';
    const errorCorrection: string = 'q';


    if (dataType === 'text' || dataType === 'url') {

      return `${baseUrl}?d=${encodeURIComponent(data)}&addtext=${tag}&qrsize=${qrSize}&t=${type}&e=${errorCorrection}.${type}`;

    } else if (dataType === 'tel') {

      return `${baseUrl}?d=${dataType}:${encodeURIComponent(data)}&addtext=${tag}&qrsize=${qrSize}&t=${type}&e=${errorCorrection}.${type}`;

    } else if (dataType === 'mailto') {

      return `${baseUrl}?d=${dataType}:${encodeURIComponent(data)}&addtext=${tag}&qrsize=${qrSize}&t=${type}&e=${errorCorrection}.${type}`;

    }
  } catch (err) {
    console.error('Failed to generate qr url:', err.message);
  }
};