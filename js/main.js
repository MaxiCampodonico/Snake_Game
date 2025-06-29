import { initGame } from './game.js';
import { setupControls } from './controls.js';

window.addEventListener('DOMContentLoaded', () => {
  setupControls();
  initGame();
});
