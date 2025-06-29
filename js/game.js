// game.js

import { getDirection, resetDirection } from './controls.js';
import { drawSnake, moveSnake, growSnake, resetSnake, getSnakeBody, getActualTileSize } from './snake.js';
import { placeFood, getFoodPosition } from './food.js';
import { initialSpeed, minSpeed } from './config.js';

let intervalId;
let speed = initialSpeed;
let score = 0;

const board = document.getElementById('game-board');
const scoreDisplay = document.getElementById('score');
const gameOverMsg = document.getElementById('game-over-msg');
const gameOverText = document.getElementById('game-over-text');
const restartBtn = document.getElementById('restart-btn');

function updateScore() {
  scoreDisplay.textContent = 'Puntos: ' + score;
}

function checkCollision(head) {
  // CAMBIO CLAVE: Usamos clientWidth/clientHeight para obtener el tamaño del área de contenido del tablero
  // Esto excluye los bordes, asegurando que la lógica de colisión se base en el espacio real de movimiento.
  const boardWidth = board.clientWidth;   // Ancho del área de contenido del tablero
  const boardHeight = board.clientHeight; // Alto del área de contenido del tablero
  const currentTileSize = getActualTileSize(); // Obtener el tamaño real del tile (segmento de la víbora)

  // Lógica de colisión con los bordes
  // head.x y head.y son las coordenadas de la esquina superior izquierda del segmento de la cabeza.
  // El segmento ocupa un espacio de 'currentTileSize' por 'currentTileSize'.
  // Para que la víbora esté completamente dentro del tablero, su esquina inferior/derecha
  // no debe exceder los límites del tablero.
  if (
    head.x < 0 || // Colisión con borde izquierdo (la cabeza se fue a la izquierda del 0)
    head.y < 0 || // Colisión con borde superior (la cabeza se fue arriba del 0)
    // Colisión con borde derecho:
    // Si la coordenada izquierda de la cabeza + el tamaño del tile es MAYOR que el ancho del tablero
    // significa que la víbora se ha salido por la derecha.
    head.x + currentTileSize > boardWidth ||
    // Colisión con borde inferior:
    // Si la coordenada superior de la cabeza + el tamaño del tile es MAYOR que el alto del tablero
    // significa que la víbora se ha salido por abajo.
    head.y + currentTileSize > boardHeight
  ) {
    endGame('¡Game Over! Tocaste el borde.');
    return true;
  }

  // Colisión consigo mismo (a partir del segundo segmento)
  const body = getSnakeBody();
  for (let i = 1; i < body.length; i++) {
    if (head.x === body[i].x && head.y === body[i].y) {
      endGame('¡Game Over! Te chocaste con vos mismo.');
      return true;
    }
  }
  return false;
}

function checkFood(head) {
  const food = getFoodPosition();
  return head.x === food.x && head.y === food.y;
}

function gameLoop() {
  const direction = getDirection();
  const newHead = moveSnake(direction);

  if (checkCollision(newHead)) return;

  if (checkFood(newHead)) {
    growSnake();
    score++;
    updateScore();
    placeFood();

    // Aumentar la dificultad (reducir la velocidad)
    if (speed > minSpeed) {
      speed -= 10;
      restartLoop(); // Reiniciar el intervalo con la nueva velocidad
    }
  }

  drawSnake();
}

function startLoop() {
  intervalId = setInterval(gameLoop, speed);
}

function restartLoop() {
  clearInterval(intervalId);
  startLoop();
}

function endGame(message) {
  clearInterval(intervalId);
  gameOverText.textContent = message;
  gameOverMsg.style.display = 'block'; // Mostrar el mensaje de Game Over
  restartBtn.style.display = 'block'; // Mostrar el botón de reiniciar
}

export function initGame() {
  score = 0;
  updateScore();
  speed = initialSpeed;
  resetSnake();
  resetDirection();
  placeFood();
  gameOverMsg.style.display = 'none'; // Ocultar el mensaje de Game Over al inicio
  restartBtn.style.display = 'none'; // Ocultar el botón de reiniciar al inicio
  startLoop();
}

// Event listener para el botón de reiniciar
restartBtn.addEventListener('click', initGame);