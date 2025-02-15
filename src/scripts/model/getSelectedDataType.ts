'use strict';

export const getSelectedDataType = async (): Promise<string> => {
  try {
    const dataOptions = document.getElementsByName('data-type') as NodeListOf<HTMLInputElement>;

    for (const option of dataOptions) {
      if (option.checked) {
        return option.value;
      }
    }

    throw new Error('No data type selected');
  } catch (err) {
    console.error('Failed to get selected data type:', (err as Error).message);
    return ''; 
  }
};