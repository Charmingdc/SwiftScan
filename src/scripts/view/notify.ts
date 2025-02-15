'use strict';

import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

// function for calling custom notfiication
export const notify = new Notyf({
  duration: 2000,
  ripple: true,
  dismissible: true,
  position: {x: 'center', y: 'top'},
 });