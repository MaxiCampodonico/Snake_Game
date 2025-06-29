// snake.js

// CAMBIO: Ya no importamos tileSize de config.js, lo calcularemos dinámicamente
// import { tileSize } from './config.js';

const board = document.getElementById('game-board');

// Cada segmento es un objeto con { x, y }
let snake = [
  { x: 0, y: 0 } // CAMBIO: Inicializamos la víbora en 0,0 para que el primer segmento se pueda usar para calcular el tileSize real
];

let actualTileSize = 0; // Variable para almacenar el tamaño real del tile

// ===============================
// OBTENER TAMAÑO REAL DEL TILE
// ===================================
// Función para obtener el tamaño real de un "tile" (segmento de la víbora o comida)
// Esto es necesario porque el tamaño puede ser dinámico (ej. con vmin en CSS)
export function getActualTileSize() {
  if (actualTileSize === 0) { // Calcular solo si aún no se ha calculado o es 0
    // La forma más fiable es leer el tamaño de un elemento ya renderizado por CSS,
    // como el de la comida, que siempre debería estar en el DOM.
    const foodElement = document.getElementById('food');
    if (foodElement && foodElement.offsetWidth > 0) {
      actualTileSize = foodElement.offsetWidth;
    } else {
      // Fallback si por alguna razón no se puede obtener (ej. DOM no cargado aún)
      actualTileSize = 20; // Valor por defecto si no se puede calcular
    }
  }
  return actualTileSize;
}

// ===============================
// DIBUJAR LA VÍBORA
// ===============================
export function drawSnake() {
  // Eliminar segmentos anteriores
  document.querySelectorAll('.snake').forEach(part => part.remove());

  const currentTileSize = getActualTileSize(); // Obtener el tamaño actual del tile

  // Dibujar nuevos segmentos
  snake.forEach(segment => {
    const el = document.createElement('div');
    el.classList.add('snake');
    el.style.width = currentTileSize + 'px'; // Usar el tamaño real del tile
    el.style.height = currentTileSize + 'px'; // Usar el tamaño real del tile
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
  const currentTileSize = getActualTileSize(); // Obtener el tamaño actual del tile

  switch (direction) {
    case 'up':
      head.y -= currentTileSize;
      break;
    case 'down':
      head.y += currentTileSize;
      break;
    case 'left':
      head.x -= currentTileSize;
      break;
    case 'right':
      head.x += currentTileSize;
      break;
  }

  snake.unshift(head);
  snake.pop(); // Elimina el último segmento para simular el movimiento

  return head;
}

// ===============================
// CRECER LA VÍBORA
// ===============================
export function growSnake() {
  const tail = snake[snake.length - 1];
  // Crea un nuevo segmento en la misma posición que la cola actual
  snake.push({ ...tail });
}

// ===============================
// RESETEAR LA VÍBORA
// ===============================
export function resetSnake() {
  const currentTileSize = getActualTileSize(); // Asegúrate de usar el tamaño correcto al resetear
  snake = [
    { x: currentTileSize * 5, y: currentTileSize * 5 } // Posición inicial
  ];
}

// ===============================
// OBTENER CUERPO DE LA VÍBORA
// ===============================
export function getSnakeBody() {
  return [...snake]; // Devuelve una copia para evitar mutaciones directas
}