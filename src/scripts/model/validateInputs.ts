'use strict';

interface ValidationResult {
  isValid: boolean;
  errTxt: string;
}

export const validateInputs = async (dataType: string, data: any): Promise<ValidationResult> => {
  try {
    if (!data) {
      return {
        isValid: false,
        errTxt: 'Input field is empty',
      };
    }

    if (dataType === 'url') {
      const regex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
      return {
        isValid: regex.test(data),
        errTxt: regex.test(data) ? '' : 'Invalid URL',
      };
    }

    if (dataType === 'mailto') {
      const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      return {
        isValid: regex.test(data),
        errTxt: regex.test(data) ? '' : 'Invalid email address',
      };
    }

    if (dataType === 'tel') {
      const isValid = !isNaN(Number(data));
      return {
        isValid,
        errTxt: isValid ? '' : 'Input value must be a number',
      };
    }

    return {
      isValid: true,
      errTxt: '',
    };
  } catch (err) {
    console.error('Error validating inputs:', (err as Error).message);
    return {
      isValid: false,
      errTxt: 'Validation error occurred',
    };
  }
};