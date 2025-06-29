//snake.js

// ===============================
// MÓDULO DE LA VÍBORA
// ===============================

// NO IMPORTAMOS tileSize de config.js directamente para movimiento/posicionamiento.
// En su lugar, obtenemos el tamaño real renderizado del DOM usando getActualTileSize().

const board = document.getElementById('game-board');

// Cada segmento es un objeto con { x, y }
let snake = []; // Se inicializará correctamente con resetSnake()

// ===============================
// FUNCIÓN PARA OBTENER EL TAMAÑO REAL DEL TILE RENDERIZADO
// ===============================
export function getActualTileSize() {
  // Obtenemos el tamaño de un elemento .snake o .food, ya que siempre deberían tener el mismo tamaño
  // y reflejar el tamaño renderizado actual del CSS (20px en PC, calc(90vmin / 20) en móvil).
  // Creamos un elemento temporal para evitar leer el tamaño de un elemento que pueda estar oculto o afectado.
  const tempElement = document.createElement('div');
  tempElement.classList.add('snake'); // Usamos la clase 'snake' para obtener su tamaño CSS
  tempElement.style.visibility = 'hidden'; // No queremos que este elemento sea visible
  tempElement.style.position = 'absolute'; // Aseguramos que no afecte el layout
  board.appendChild(tempElement);
  const actualSize = tempElement.offsetWidth; // offsetWidth nos da el tamaño calculado en píxeles
  tempElement.remove(); // Limpiar el elemento temporal después de obtener su tamaño
  return actualSize;
}

// ===============================
// DIBUJAR LA VÍBORA
// ===============================
export function drawSnake() {
  // Eliminar segmentos anteriores
  document.querySelectorAll('.snake').forEach(part => part.remove());

  // Obtener el tamaño del tile actual para dibujar. Es crucial que el tamaño de los elementos
  // CSS (.snake) coincida con el tamaño usado en JS para el movimiento y la lógica.
  const currentTileSize = getActualTileSize();

  // Dibujar nuevos segmentos
  snake.forEach(segment => {
    const el = document.createElement('div');
    el.classList.add('snake');
    // Usar el tamaño actual del tile para dibujar correctamente
    el.style.width = currentTileSize + 'px';
    el.style.height = currentTileSize + 'px';
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
  // Obtener el tamaño del tile actual para el movimiento.
  // Es vital que este valor sea el mismo que el que usa el CSS para dibujar los tiles.
  const currentTileSize = getActualTileSize();

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
  snake.pop(); // Elimina la cola para mantener la longitud de la víbora si no ha crecido

  return head;
}

// ===============================
// CRECER LA VÍBORA
// ===============================
export function growSnake() {
  const tail = snake[snake.length - 1];
  snake.push({ ...tail }); // Añade un nuevo segmento en la posición de la cola
}

// ===============================
// RESETEAR LA VÍBORA
// ===============================
export function resetSnake() {
  const currentTileSize = getActualTileSize();
  // Reiniciar la víbora a su posición y tamaño inicial.
  // Asegurarse de que la posición inicial también sea un múltiplo del tamaño del tile actual
  snake = [
    { x: currentTileSize * 5, y: currentTileSize * 5 } // Posición inicial basada en el tamaño real del tile
  ];
}

// ===============================
// OBTENER CUERPO DE LA VÍBORA
// ===============================
export function getSnakeBody() {
  return [...snake]; // Devuelve una copia del array para evitar mutaciones directas
}