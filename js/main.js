import { initGame } from './game.js';
import { setupControls } from './controls.js';
import { applyBoardSizeToElement } from './config.js';

window.addEventListener('DOMContentLoaded', () => {
  applyBoardSizeToElement(); // Establece el tamaño del tablero al iniciar
  setupControls();
  initGame();
});

window.addEventListener('resize', () => {
  applyBoardSizeToElement();
});

