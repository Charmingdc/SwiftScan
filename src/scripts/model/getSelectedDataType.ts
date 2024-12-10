'use strict';

export const getSelectedDataType = async (): string => {
  try {
   const dataOptions = document.getElementsByName('data-type');

   for (const option of dataOptions) {
     if (option.checked) {
       return option.value;
     }
   } 
   
  } catch (err) {
    console.log('Failed to get selected data type:', err.message);
  }
};