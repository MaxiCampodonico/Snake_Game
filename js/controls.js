// ===============================
// MÓDULO DE CONTROLES
// ===============================

// Dirección actual y la próxima dirección (para evitar giros ilegales)
let currentDirection = 'right';
let nextDirection = 'right';

// Direcciones opuestas (para prevenir que la víbora se choque con sí misma)
const oppositeDirections = {
  up: 'down',
  down: 'up',
  left: 'right',
  right: 'left'
};

// ===============================
// FUNCIONES EXPORTADAS
// ===============================

// Devuelve la dirección que debe usar la víbora
export function getDirection() {
  currentDirection = nextDirection;
  return currentDirection;
}

// Resetea las direcciones a su estado inicial
export function resetDirection() {
  currentDirection = 'right';
  nextDirection = 'right';
}

// ===============================
// CAMBIAR DIRECCIÓN SI ES VÁLIDA
// ===============================
function changeDirection(newDir) {
  if (newDir !== oppositeDirections[currentDirection]) {
    nextDirection = newDir;
  }
}

// ===============================
// CONFIGURAR TECLADO
// ===============================
function setupKeyboard() {
  window.addEventListener('keydown', (e) => {
    const key = e.key.toLowerCase();
    if (key === 'arrowup' || key === 'w') changeDirection('up');
    else if (key === 'arrowdown' || key === 's') changeDirection('down');
    else if (key === 'arrowleft' || key === 'a') changeDirection('left');
    else if (key === 'arrowright' || key === 'd') changeDirection('right');
  });
}

// ===============================
// CONFIGURAR BOTONES TÁCTILES
// ===============================
function setupTouchControls() {
  const upBtn = document.getElementById('up-btn');
  const downBtn = document.getElementById('down-btn');
  const leftBtn = document.getElementById('left-btn');
  const rightBtn = document.getElementById('right-btn');

  if (upBtn && downBtn && leftBtn && rightBtn) {
    upBtn.addEventListener('click', () => changeDirection('up'));
    downBtn.addEventListener('click', () => changeDirection('down'));
    leftBtn.addEventListener('click', () => changeDirection('left'));
    rightBtn.addEventListener('click', () => changeDirection('right'));
  }
}

// ===============================
// INICIALIZAR CONTROLES
// ===============================
export function setupControls() {
  setupKeyboard();
  setupTouchControls();
}
