// food.js

// ===============================
// MÓDULO DE LA COMIDA
// ===============================

// CAMBIO: Ya no importamos tileSize ni boardSize de config.js
// Los obtendremos dinámicamente desde el DOM o snake.js
// import { tileSize, boardSize } from './config.js';
import { getSnakeBody, getActualTileSize } from './snake.js'; // CAMBIO: Importamos getActualTileSize

const food = document.getElementById('food');
let foodPosition = { x: 0, y: 0 };

// Variable para almacenar el tamaño de tile real para la comida (debería ser el mismo que el de la víbora)
let actualTileSizeFood = 0;

// ===============================
// POSICIÓN ALEATORIA VÁLIDA
// ===============================
function getRandomPosition() {
  // Asegurarse de que actualTileSizeFood esté disponible
  if (actualTileSizeFood === 0) {
      actualTileSizeFood = getActualTileSize(); // Usar la función de snake.js
  }

  // Obtener las dimensiones actuales del tablero
  const boardElement = document.getElementById('game-board');
  const actualBoardWidth = boardElement.offsetWidth;
  const actualBoardHeight = boardElement.offsetHeight;

  // Calcular el número de tiles posibles en cada dirección
  const maxTilesX = actualBoardWidth / actualTileSizeFood;
  const maxTilesY = actualBoardHeight / actualTileSizeFood;

  const snakeBody = getSnakeBody();

  let newPos;
  let isOnSnake;

  do {
    // Generar una posición aleatoria que sea un múltiplo del tamaño del tile
    const x = Math.floor(Math.random() * maxTilesX) * actualTileSizeFood;
    const y = Math.floor(Math.random() * maxTilesY) * actualTileSizeFood;
    newPos = { x, y };

    // Verifica si la posición coincide con alguna parte de la víbora
    isOnSnake = snakeBody.some(segment => segment.x === x && segment.y === y);
  } while (isOnSnake); // Repetir hasta encontrar una posición que no esté en la víbora

  return newPos;
}

// ===============================
// COLOCAR LA COMIDA EN EL TABLERO
// ===============================
export function placeFood() {
  foodPosition = getRandomPosition();
  food.style.left = foodPosition.x + 'px';
  food.style.top = foodPosition.y + 'px';

  // Asegurar que el tamaño de la comida coincida con el tamaño del tile
  const currentTileSize = getActualTileSize();
  food.style.width = currentTileSize + 'px';
  food.style.height = currentTileSize + 'px';
}

// ===============================
// OBTENER POSICIÓN DE LA COMIDA
// ===============================
export function getFoodPosition() {
  return { ...foodPosition }; // Devuelve una copia para evitar mutaciones directas
}