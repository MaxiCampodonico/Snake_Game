// main.js

import { initGame } from './game.js';
import { setupControls } from './controls.js';
// CAMBIO: Eliminamos la importación de applyBoardSizeToElement

window.addEventListener('DOMContentLoaded', () => {
  // CAMBIO: Eliminamos la llamada a applyBoardSizeToElement()
  setupControls();
  initGame();
});

window.addEventListener('resize', () => {
  // CAMBIO: Eliminamos la llamada a applyBoardSizeToElement()
});