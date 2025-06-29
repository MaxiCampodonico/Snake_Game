// food.js

// ===============================
// MÓDULO DE LA COMIDA
// ===============================

// Importamos getActualTileSize y getSnakeBody desde snake.js
import { getSnakeBody, getActualTileSize } from './snake.js';

const food = document.getElementById('food');
let foodPosition = { x: 0, y: 0 };

// ===============================
// POSICIÓN ALEATORIA VÁLIDA
// ===============================
function getRandomPosition() {
  // Obtener el tamaño actual del tile, crucial para posicionar la comida correctamente
  const currentTileSize = getActualTileSize();

  // Obtener las dimensiones actuales del tablero usando clientWidth/clientHeight
  // para que la comida se genere dentro del área de contenido visible, excluyendo bordes.
  const boardElement = document.getElementById('game-board');
  const actualBoardWidth = boardElement.clientWidth;
  const actualBoardHeight = boardElement.clientHeight;

  // Calcular el número de tiles posibles en cada dirección dentro del área de contenido.
  // Math.floor aquí es importante para asegurar que los resultados sean enteros y se ajusten a la cuadrícula.
  const maxTilesX = Math.floor(actualBoardWidth / currentTileSize);
  const maxTilesY = Math.floor(actualBoardHeight / currentTileSize);

  const snakeBody = getSnakeBody();

  let newPos;
  let isOnSnake;

  do {
    // Generar una posición aleatoria que sea un múltiplo del tamaño del tile.
    // Los Math.random() * maxTilesX/Y aseguran que el índice de tile esté dentro de los límites válidos.
    const x = Math.floor(Math.random() * maxTilesX) * currentTileSize;
    const y = Math.floor(Math.random() * maxTilesY) * currentTileSize;
    newPos = { x, y };

    // Verifica si la nueva posición de la comida coincide con alguna parte de la víbora
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

  // Asegurar que el tamaño de la comida coincida con el tamaño del tile actual.
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