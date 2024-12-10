'use strict';

export const resetInputs = (currentDataType: HTMLParamElement, dataInput: HTMLInputElement): void => {
  
  currentDataType.textContent = 'Data type: Any text';
  dataInput.value = ''; // reset all inputs
};