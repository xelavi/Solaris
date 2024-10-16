const INITIAL_GRID_SIZE = 20;
const MOVEMENT_RANGE = 3;

class ExpandableGridGame {
  constructor(container) {
    this.container = container;
    this.gridSize = INITIAL_GRID_SIZE;
    this.playerPosition = { x: 0, y: 0 };
    this.showMovementRange = false;
    this.isDragging = false;

    this.init();
  }

  init() {
    this.createControls();
    this.createGrid();
    this.updateGrid();
  }

  createControls() {
    const controls = document.createElement('div');
    controls.className = 'controls';
    
    const expandButton = document.createElement('button');
    expandButton.textContent = 'Expand Grid';
    expandButton.addEventListener('click', () => this.expandGrid());
    
    this.gridSizeDisplay = document.createElement('span');
    this.updateGridSizeDisplay();
    
    controls.appendChild(expandButton);
    controls.appendChild(this.gridSizeDisplay);
    this.container.appendChild(controls);
  }

  createGrid() {
    this.grid = document.createElement('div');
    this.grid.className = 'grid';
    this.container.appendChild(this.grid);
  }

  updateGrid() {
    this.grid.innerHTML = '';
    this.grid.style.gridTemplateColumns = `repeat(${this.gridSize}, 20px)`;
    
    for (let y = 0; y < this.gridSize; y++) {
      for (let x = 0; x < this.gridSize; x++) {
        const cell = this.createCell(x, y);
        this.grid.appendChild(cell);
      }
    }
  }

  createCell(x, y) {
    const cell = document.createElement('div');
    cell.className = 'cell';
    
    const isPlayer = x === this.playerPosition.x && y === this.playerPosition.y;
    const isMovementRange = this.showMovementRange && this.isWithinMovementRange(x, y);
    
    if (isMovementRange) {
      cell.classList.add('movement-range');
    }
    
    if (isPlayer) {
      const player = document.createElement('div');
      player.className = 'player';
      player.draggable = true;
      player.addEventListener('dragstart', (e) => this.handleDragStart(e, x, y));
      cell.appendChild(player);
    }
    
    cell.addEventListener('click', () => this.handleCellClick(x, y));
    cell.addEventListener('dragover', (e) => e.preventDefault());
    cell.addEventListener('drop', () => this.handleDrop(x, y));
    
    return cell;
  }

  expandGrid() {
    this.gridSize += 10;
    this.updateGrid();
    this.updateGridSizeDisplay();
  }

  updateGridSizeDisplay() {
    this.gridSizeDisplay.textContent = `Grid Size: ${this.gridSize}x${this.gridSize}`;
  }

  isWithinMovementRange(x, y) {
    const dx = Math.abs(x - this.playerPosition.x);
    const dy = Math.abs(y - this.playerPosition.y);
    return dx + dy <= MOVEMENT_RANGE;
  }

  handleCellClick(x, y) {
    if (x === this.playerPosition.x && y === this.playerPosition.y) {
      this.showMovementRange = !this.showMovementRange;
    } else if (this.showMovementRange && this.isWithinMovementRange(x, y)) {
      this.movePlayer(x, y);
    }
    this.updateGrid();
  }

  handleDragStart(e, x, y) {
    if (x === this.playerPosition.x && y === this.playerPosition.y) {
      this.isDragging = true;
      this.showMovementRange = true;
      this.updateGrid();
    }
  }

  handleDrop(x, y) {
    if (this.isDragging && this.isWithinMovementRange(x, y)) {
      this.movePlayer(x, y);
    }
    this.isDragging = false;
    this.showMovementRange = false;
    this.updateGrid();
  }

  movePlayer(x, y) {
    this.playerPosition = { x, y };
    this.showMovementRange = false;
  }
}

// Initialize the game
document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('game-container');
  new ExpandableGridGame(container);
});

// CSS styles (you can move this to a separate CSS file)
const styles = `
  .controls {
    margin-bottom: 10px;
  }
  .controls button {
    margin-right: 10px;
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
    background-color: blue;
    border-radius: 50%;
  }
`;

// Add styles to the document
const styleElement = document.createElement('style');
styleElement.textContent = styles;
document.head.appendChild(styleElement);
