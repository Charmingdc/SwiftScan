'use strict';

// importing helper functions 
// view
import { getElement } from '../view/getElement.ts';
import { notify } from '../view/notify.ts';
import { showLoader } from '../view/showLoader.ts';


// model
import { getSelectedDataType } from '../model/getSelectedDataType.ts';
import { generateQrUrl } from '../model/generateQrUrl.ts';
import { generateQrCode } from '../model/generateQrUrl.ts';


// getting dom elements 
const githubLink = getElement < HTMLElement > ('github-link', 'id');
const dataTypesBox = getElement < HTMLDivElement > ('data-types-box', 'class');
const dataTypePicker = getElement < HTMLDivElement > ('data-type-picker', 'id');
const currentDataType = getElement < HTMLParagraphElement > ('current-data-type', 'id');
  const dataInput = getElement < HTMLInputElement > ('data-input', 'id');
const generateBtn = getElement < HTMLButtonElement > ('generate-button', 'id');





export const initController = async () => {

  const displayCurrentDataTpye = async () => {
    const dataType = await getSelectedDataType();
    currentDataType.textContent = `Data type: ${dataType}`;
  }
  displayCurrentDataTpye();



  const handleQrcode = async () => {
    try {
      // show loading
      showLoader(true, generateBtn); 
      
      // get data type
      const dataType: string = await getSelectedDataType();
      
      // get data value 
      const data: string | number = dataInput.value;
      
      // check if data value is an empty string 
      if (data === '') {
        notify.error('Please input a value')
        return;
      };
      
      // generate qr code url
      const qrUrl: string = await generateQrUrl(dataType, data);
      
      // stop loading effect 
      showLoader(false, generateBtn);
      // generate qr code
      
      console.log(qrUrl);
      
      // await generateQrCode(qrUrl);
    } catch (err) {
      console.log('Failed to create qrcode:', err.message);
    } finally {
      generateBtn.classList.remove('disbaled');
      generateBtn.removeAttribut('disabled')
    }
  }



  const handleEvents = () => {
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