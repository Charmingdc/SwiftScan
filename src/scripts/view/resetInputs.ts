export const resetInputs = (currentDataType: HTMLParagraphElement, dataInput: HTMLInputElement): void => {
  currentDataType.textContent = 'Data type: Any text';
  dataInput.value = ''; // Reset input field
};