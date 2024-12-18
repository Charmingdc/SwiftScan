'use strict';

// importing helper functions 
// view
import { getElement } from '../view/getElement.ts';
import { notify } from '../view/notify.ts';
import { showLoader } from '../view/showLoader.ts';
import { renderQrCode } from '../view/renderQrCode.ts';
import { resetInputs } from '../view/resetInputs.ts';


// model
import { getSelectedDataType } from '../model/getSelectedDataType.ts';
import { generateQrUrl } from '../model/generateQrUrl.ts';
import { validateInputs } from '../model/validateInputs.ts';



// getting dom elements 
const githubLink = getElement < HTMLElement > ('github-link', 'id');
const dataTypesBox = getElement < HTMLDivElement > ('data-types-box', 'class');
const dataTypePicker = getElement < HTMLDivElement > ('data-type-picker', 'id');
const currentDataType = getElement < HTMLParagraphElement > ('current-data-type', 'id');
const dataInput = getElement < HTMLInputElement > ('data-input', 'id');
const generateBtn = getElement < HTMLButtonElement > ('generate-button', 'id');





export const initController = async (): void => {

  const displayCurrentDataTpye = async (): void => {
    const dataType = await getSelectedDataType();
    currentDataType.textContent = `Data type: ${dataType}`;
  }
  displayCurrentDataTpye();



  const handleQrcode = async (): void => {
    interface ValidationResult {
      isValid: boolean;
      errTxt: string;
    }
    
    
    try {
      // show loading
      await showLoader(true, generateBtn);

      // get data type
      const dataType: string = await getSelectedDataType();

      // get data value 
      const data: string | number = dataInput.value.trim();


      const { isValid, errTxt }: ValidationResult = await validateInputs(dataType, data);


      if (isValid === false) {
        notify.error(`${errTxt}`);
        await showLoader(false, generateBtn);
        return;
      }

      // generate qr code url
      const qrUrl: string = await generateQrUrl(dataType, data);

      // render qr code
      await renderQrCode(qrUrl);

      // stop loading effect 
      await showLoader(false, generateBtn);

      // reset all Inputs text
      await resetInputs(currentDataType, dataInput);
      
      // update current data type
      await displayCurrentDataTpye();
    } catch (err) {
      console.log('Failed to create qrcode:', err.message);
    } finally {
      await showLoader(false, generateBtn)
    }
  }



  const handleEvents = (): void => {
    // redirect user to SwiftScan repo
    githubLink.addEventListener('click', () => {
      window.location.href = 'https://github.com/Charmingdc/SwiftScan';
    });

    dataTypePicker.addEventListener('click', async () => {
      dataTypesBox.classList.toggle('show');
      await displayCurrentDataTpye();
    });

    generateBtn.addEventListener('click', async () => {
      await handleQrcode();
    });

  }
  handleEvents();


};