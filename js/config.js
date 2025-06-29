// ===============================
// CONFIGURACIÓN GLOBAL DEL JUEGO
// ===============================

export const tileSize = 20;       // Tamaño de cada "tile" en píxeles
export const initialSpeed = 200;  // Velocidad inicial en ms
export const minSpeed = 60;       // Velocidad mínima permitida

// Nuevo: calcular dinámicamente el tamaño del tablero
export function getBoardSize() {
  const maxWidth = window.innerWidth;
  const maxHeight = window.innerHeight;

  // Calculamos cuántos tiles entran horizontal y verticalmente
  const cols = Math.floor(maxWidth / tileSize);
  const rows = Math.floor(maxHeight / tileSize);

  // Usamos el mínimo de ambos para mantenerlo cuadrado
  return Math.min(cols, rows) * tileSize;
}

export function applyBoardSizeToElement() {
  const board = document.getElementById('game-board');
  const size = getBoardSize();
  board.style.width = size + 'px';
  board.style.height = size + 'px';
}
