const GRID_SIZE = 30;
const MOVEMENT_RANGE = 3;

class Player {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
  }
}

class MultiPlayerGridGame {
  constructor(container) {
    this.container = container;
    this.players = [
      new Player(0, 0, 'blue'),
      new Player(GRID_SIZE - 1, GRID_SIZE - 1, 'red')
    ];
    this.activePlayerIndex = 0;
    this.showMovementRange = false;
    this.isDragging = false;

    this.init();
  }

  init() {
    this.createGrid();
    this.createPlayerTurnIndicator();
    this.updateGrid();
  }

  createGrid() {
    this.grid = document.createElement('div');
    this.grid.className = 'grid';
    this.container.appendChild(this.grid);
  }

  createPlayerTurnIndicator() {
    this.turnIndicator = document.createElement('div');
    this.turnIndicator.className = 'turn-indicator';
    this.container.insertBefore(this.turnIndicator, this.grid);
    this.updateTurnIndicator();
  }

  updateGrid() {
    this.grid.innerHTML = '';
    this.grid.style.gridTemplateColumns = `repeat(${GRID_SIZE}, 20px)`;
    
    for (let y = 0; y < GRID_SIZE; y++) {
      for (let x = 0; x < GRID_SIZE; x++) {
        const cell = this.createCell(x, y);
        this.grid.appendChild(cell);
      }
    }
  }

  createCell(x, y) {
    const cell = document.createElement('div');
    cell.className = 'cell';
    
    const player = this.getPlayerAt(x, y);
    const isMovementRange = this.showMovementRange && this.isWithinMovementRange(x, y);
    
    if (isMovementRange) {
      cell.classList.add('movement-range');
    }
    
    if (player) {
      const playerElement = document.createElement('div');
      playerElement.className = 'player';
      playerElement.style.backgroundColor = player.color;
      playerElement.draggable = true;
      playerElement.addEventListener('dragstart', (e) => this.handleDragStart(e, x, y));
      cell.appendChild(playerElement);
    }
    
    cell.addEventListener('click', () => this.handleCellClick(x, y));
    cell.addEventListener('dragover', (e) => e.preventDefault());
    cell.addEventListener('drop', () => this.handleDrop(x, y));
    
    return cell;
  }

  getPlayerAt(x, y) {
    return this.players.find(player => player.x === x && player.y === y);
  }

  isWithinMovementRange(x, y) {
    const activePlayer = this.players[this.activePlayerIndex];
    const dx = Math.abs(x - activePlayer.x);
    const dy = Math.abs(y - activePlayer.y);
    return dx + dy <= MOVEMENT_RANGE;
  }

  handleCellClick(x, y) {
    const activePlayer = this.players[this.activePlayerIndex];
    if (x === activePlayer.x && y === activePlayer.y) {
      this.showMovementRange = !this.showMovementRange;
    } else if (this.showMovementRange && this.isWithinMovementRange(x, y) && !this.getPlayerAt(x, y)) {
      this.moveActivePlayer(x, y);
    }
    this.updateGrid();
  }

  handleDragStart(e, x, y) {
    const activePlayer = this.players[this.activePlayerIndex];
    if (x === activePlayer.x && y === activePlayer.y) {
      this.isDragging = true;
      this.showMovementRange = true;
      this.updateGrid();
    }
  }

  handleDrop(x, y) {
    if (this.isDragging && this.isWithinMovementRange(x, y) && !this.getPlayerAt(x, y)) {
      this.moveActivePlayer(x, y);
    }
    this.isDragging = false;
    this.showMovementRange = false;
    this.updateGrid();
  }

  moveActivePlayer(x, y) {
    const activePlayer = this.players[this.activePlayerIndex];
    activePlayer.x = x;
    activePlayer.y = y;
    this.showMovementRange = false;
    this.activePlayerIndex = (this.activePlayerIndex + 1) % this.players.length;
    this.updateTurnIndicator();
  }

  updateTurnIndicator() {
    const activePlayer = this.players[this.activePlayerIndex];
    this.turnIndicator.textContent = `Current Turn: ${activePlayer.color} player`;
    this.turnIndicator.style.color = activePlayer.color;
  }
}

// Initialize the game
document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('game-container');
  new MultiPlayerGridGame(container);
});

// CSS styles (you can move this to a separate CSS file)
const styles = `
  .turn-indicator {
    margin-bottom: 10px;
    font-weight: bold;
  }
  .grid {
    display: grid;
    gap: 1px;
    background-color: #ccc;
  }
  .cell {
    width: 20px;
    height: 20px;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
  .cell.movement-range {
    background-color: #ffff99;
  }
  .player {
    width: 16px;
    height: 16px;
    border-radius: 50%;
  }
`;

// Add styles to the document
const styleElement = document.createElement('style');
styleElement.textContent = styles;
document.head.appendChild(styleElement);
