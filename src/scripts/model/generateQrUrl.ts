'use strict';

export const generateQrUrl = async (dataType: string, data: string | number): Promise<string> => {
  try {
    const baseUrl: string = 'https://qrickit.com/api/qr.php';
    const tag: string = 'SwiftScan';
    const qrSize: number = 280;
    const type: string = 'png';
    const errorCorrection: string = 'q';

    // Ensure data is always a string
    const encodedData = encodeURIComponent(String(data));

    if (['text', 'url'].includes(dataType)) {
      return `${baseUrl}?d=${encodedData}&addtext=${tag}&qrsize=${qrSize}&t=${type}&e=${errorCorrection}`;
    } else if (['tel', 'mailto'].includes(dataType)) {
      return `${baseUrl}?d=${dataType}:${encodedData}&addtext=${tag}&qrsize=${qrSize}&t=${type}&e=${errorCorrection}`;
    }

    throw new Error(`Unsupported data type: ${dataType}`);
  } catch (err) {
    console.error('Failed to generate QR URL:', (err as Error).message);
    return ''; // Return an empty string if an error occurs
  }
};