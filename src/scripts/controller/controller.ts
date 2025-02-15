'use strict';

// Importing helper functions  
// View  
import { getElement } from '../view/getElement.ts';
import { notify } from '../view/notify.ts';
import { showLoader } from '../view/showLoader.ts';
import { renderQrCode } from '../view/renderQrCode.ts';
import { resetInputs } from '../view/resetInputs.ts';

// Model  
import { getSelectedDataType } from '../model/getSelectedDataType.ts';
import { generateQrUrl } from '../model/generateQrUrl.ts';
import { validateInputs } from '../model/validateInputs.ts';

// Getting DOM elements  
const githubLink = getElement<HTMLElement>('github-link', 'id');
const dataTypesBox = getElement<HTMLDivElement>('data-types-box', 'class');
const dataTypePicker = getElement<HTMLDivElement>('data-type-picker', 'id');
const currentDataType = getElement<HTMLParagraphElement>('current-data-type', 'id');
const dataInput = getElement<HTMLInputElement>('data-input', 'id');
const generateBtn = getElement<HTMLButtonElement>('generate-button', 'id');

export const initController = async (): Promise<void> => {
  const displayCurrentDataType = async (): Promise<void> => {
    const dataType = await getSelectedDataType();
    if (currentDataType) currentDataType.textContent = `Data type: ${dataType}`;
  };

  displayCurrentDataType();

  const handleQrcode = async (): Promise<void> => {
    interface ValidationResult {
      isValid: boolean;
      errTxt: string;
    }

    try {
      if (!generateBtn || !dataInput) return; // Null check

      // Show loading  
      await showLoader(true, generateBtn);

      // Get data type  
      const dataType: string = await getSelectedDataType();

      // Get data value  
      const data: string = dataInput.value?.trim() || ''; // Ensures data is always a string

      // Validate inputs  
      const { isValid, errTxt }: ValidationResult = await validateInputs(dataType, data);

      if (!isValid) {
        notify.error(errTxt);
        await showLoader(false, generateBtn);
        return;
      }

      // Generate QR code URL  
      const qrUrl: string = await generateQrUrl(dataType, data);

      // Render QR code  
      await renderQrCode(qrUrl);

      // Stop loading effect  
      await showLoader(false, generateBtn);

      // Reset all input fields  
      if (currentDataType && dataInput) {
        await resetInputs(currentDataType, dataInput);
      }

      // Update current data type  
      await displayCurrentDataType();
    } catch (err) {
      console.error('Failed to create QR code:', (err as Error).message);
    } finally {
      if (generateBtn) await showLoader(false, generateBtn);
    }
  };

  const handleEvents = (): void => {
    // Redirect user to SwiftScan repo  
    if (githubLink) {
      githubLink.addEventListener('click', () => {
        window.location.href = 'https://github.com/Charmingdc/SwiftScan';
      });
    }

    if (dataTypePicker && dataTypesBox) {
      dataTypePicker.addEventListener('click', async () => {
        dataTypesBox.classList.toggle('show');
        await displayCurrentDataType();
      });
    }

    if (generateBtn) {
      generateBtn.addEventListener('click', async () => {
        await handleQrcode();
      });
    }
  };

  handleEvents();
};