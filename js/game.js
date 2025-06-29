// ===============================
// CONTROLADOR PRINCIPAL DEL JUEGO
// ===============================

import { getDirection, resetDirection } from './controls.js';
import { drawSnake, moveSnake, growSnake, resetSnake, getSnakeHead, getSnakeBody } from './snake.js';
import { getFoodPosition, placeFood } from './food.js';
import { tileSize, getBoardSize, initialSpeed, minSpeed } from './config.js';


let intervalId;
let speed = initialSpeed;
let score = 0;

// DOM
const board = document.getElementById('game-board');
const scoreDisplay = document.getElementById('score');
const gameOverMsg = document.getElementById('game-over-msg');
const gameOverText = document.getElementById('game-over-text');
const restartBtn = document.getElementById('restart-btn');

// ===============================
// ACTUALIZAR PUNTAJE EN PANTALLA
// ===============================
function updateScore() {
  scoreDisplay.textContent = 'Puntos: ' + score;
}

// ===============================
// DETECTAR COLISIONES
// ===============================
function checkCollision(head) {
  // Contra bordes
  const boardSize = getBoardSize();
if (
  head.x < 0 ||
  head.y < 0 ||
  head.x >= boardSize ||
  head.y >= boardSize
)
 {
    endGame('¡Game Over! Tocaste el borde.');
    return true;
  }

  // Contra el cuerpo
  const body = getSnakeBody();
  for (let i = 1; i < body.length; i++) {
    if (head.x === body[i].x && head.y === body[i].y) {
      endGame('¡Game Over! Te chocaste con vos mismo.');
      return true;
    }
  }

  return false;
}

// ===============================
// DETECTAR SI COMIÓ
// ===============================
function checkFood(head) {
  const food = getFoodPosition();
  return head.x === food.x && head.y === food.y;
}

// ===============================
// BUCLE PRINCIPAL DEL JUEGO
// ===============================
function gameLoop() {
  const direction = getDirection();
  const newHead = moveSnake(direction);

  if (checkCollision(newHead)) return;

  if (checkFood(newHead)) {
    growSnake();
    score++;
    updateScore();
    placeFood();

    if (speed > minSpeed) {
      speed -= 10;
      restartLoop();
    }
  }

  drawSnake();
}

// ===============================
// CONTROL DEL INTERVALO
// ===============================
function startLoop() {
  intervalId = setInterval(gameLoop, speed);
}

function restartLoop() {
  clearInterval(intervalId);
  startLoop();
}

// ===============================
// TERMINAR JUEGO
// ===============================
function endGame(message) {
  clearInterval(intervalId);
  gameOverText.textContent = message;
  gameOverMsg.style.display = 'block';
  restartBtn.style.display = 'inline-block';
}

// ===============================
// REINICIAR TODO
// ===============================
function resetGame() {
  clearInterval(intervalId);
  resetSnake();
  resetDirection();
  score = 0;
  speed = initialSpeed;
  updateScore();
  placeFood();
  drawSnake();

  gameOverMsg.style.display = 'none';
  restartBtn.style.display = 'none';

  startLoop();
}

// ===============================
// INICIALIZACIÓN PRINCIPAL
// ===============================
export function initGame() {
  restartBtn.addEventListener('click', resetGame);
  resetGame();
}
