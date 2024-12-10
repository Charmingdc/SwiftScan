'use strict';


interface ValidationResult {
  isValid: boolean;
  errTxt: string;
}



export const validateInputs = async (dataType: string, data: any): Promise<ValidationResult>  => {

  try {
    if (data === '') {
      return {
        isValid: false,
        errTxt: 'Input field is empty'
      }
    } else if (dataType === 'url') {
      const regex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;

      return {
        isValid: regex.test(data),
        errTxt: 'Invalid url',
      }
    } else if (dataType === 'MAILTO') {
      const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

      return {
        isValid: regex.test(data),
        errTxt: 'Invalid email address'
      }
    } else if (dataType === 'TEL') {
      const num = Number(data);
      const isValid = typeof num === 'number' && !isNaN(num);
      
      return {
        isValid,
        errTxt: 'Input value must be a number',
      }
    } else {
      return {
        isValid: true,
        errTxt: 'none',
      }
    }
  } catch (err) {
    console.error('Error validating inputs:', err.message);
  }
};