'use strict';

export const getElement = <T extends Element>(elementId: string, type: string): T | null => {
  let elm: T | null = null;

  if (type === 'id') {
    elm = document.querySelector(`#${elementId}`) as T;
  } else if (type === 'class') {
    elm = document.querySelector(`.${elementId}`) as T;
  }

  if (!elm) {
    console.error(`Element with identifier *${elementId}* is not found`);
  }

  return elm;
};