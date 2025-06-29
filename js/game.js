// game.js

import { getDirection, resetDirection } from './controls.js';
import { drawSnake, moveSnake, growSnake, resetSnake, getSnakeBody } from './snake.js';
import { placeFood, getFoodPosition } from './food.js';
import { tileSize, boardSize, initialSpeed, minSpeed } from './config.js';

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
  if (
    head.x < 0 ||
    head.y < 0 ||
    head.x >= boardSize ||
    head.y >= boardSize
  ) {
    endGame('¡Game Over! Tocaste el borde.');
    return true;
  }

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

    if (speed > minSpeed) {
      speed -= 10;
      restartLoop();
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
  gameOverMsg.style.display = 'block';
  restartBtn.style.display = 'inline-block';
}

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

export function initGame() {
  restartBtn.addEventListener('click', resetGame);
  resetGame();
}
