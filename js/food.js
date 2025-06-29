// food.js

// ===============================
// MÓDULO DE LA COMIDA
// ===============================

import { tileSize, boardSize } from './config.js'; // CAMBIO: Importamos 'boardSize' directamente
import { getSnakeBody } from './snake.js'; // Importamos la víbora

const food = document.getElementById('food');
let foodPosition = { x: 0, y: 0 };

// ===============================
// POSICIÓN ALEATORIA VÁLIDA
// ===============================
function getRandomPosition() {
  const maxTiles = boardSize / tileSize; // CAMBIO: Usamos 'boardSize' directamente
  const snakeBody = getSnakeBody();

  let newPos;
  let isOnSnake;

  do {
    const x = Math.floor(Math.random() * maxTiles) * tileSize;
    const y = Math.floor(Math.random() * maxTiles) * tileSize;
    newPos = { x, y };

    // Verifica si la posición coincide con alguna parte de la víbora
    isOnSnake = snakeBody.some(segment => segment.x === x && segment.y === y);
  } while (isOnSnake);

  return newPos;
}

// ===============================
// COLOCAR LA COMIDA EN EL TABLERO
// ===============================
export function placeFood() {
  foodPosition = getRandomPosition();
  food.style.left = foodPosition.x + 'px';
  food.style.top = foodPosition.y + 'px';
}

// ===============================
// OBTENER POSICIÓN ACTUAL
// ===============================
export function getFoodPosition() {
  return foodPosition;
}