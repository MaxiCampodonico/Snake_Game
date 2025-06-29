//snake.js

// ===============================
// MÓDULO DE LA VÍBORA
// ===============================

import { tileSize } from './config.js';

const board = document.getElementById('game-board');

// Cada segmento es un objeto con { x, y }
let snake = [
  { x: tileSize * 5, y: tileSize * 5 }
];

// ===============================
// DIBUJAR LA VÍBORA
// ===============================
export function drawSnake() {
  // Eliminar segmentos anteriores
  document.querySelectorAll('.snake').forEach(part => part.remove());

  // Dibujar nuevos segmentos
  snake.forEach(segment => {
    const el = document.createElement('div');
    el.classList.add('snake');
    el.style.width = tileSize + 'px';
    el.style.height = tileSize + 'px';
    el.style.left = segment.x + 'px';
    el.style.top = segment.y + 'px';
    board.appendChild(el);
  });
}

// ===============================
// MOVER LA VÍBORA
// ===============================
export function moveSnake(direction) {
  const head = { ...snake[0] };

  switch (direction) {
    case 'up':
      head.y -= tileSize;
      break;
    case 'down':
      head.y += tileSize;
      break;
    case 'left':
      head.x -= tileSize;
      break;
    case 'right':
      head.x += tileSize;
      break;
  }

  snake.unshift(head);
  snake.pop();

  return head;
}

// ===============================
// CRECER LA VÍBORA
// ===============================
export function growSnake() {
  const tail = snake[snake.length - 1];
  snake.push({ ...tail });
}

// ===============================
// RESETEAR LA VÍBORA
// ===============================
export function resetSnake() {
  snake = [
    { x: tileSize * 5, y: tileSize * 5 }
  ];
}

// ===============================
// OBTENER INFORMACIÓN
// ===============================
export function getSnakeHead() {
  return snake[0];
}

export function getSnakeBody() {
  return snake;
}
