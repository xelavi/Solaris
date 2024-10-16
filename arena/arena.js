const INITIAL_GRID_SIZE = 50;
const MOVEMENT_RANGE = 3;
let gridSize = INITIAL_GRID_SIZE;
//player position
let grid;
let container;
let players =  [];

function createGrid() {
    grid = document.createElement('div');
    grid.className = 'grid';
    container.appendChild(grid);
    updateGrid();
  }

 function updateGrid() {
   grid.innerHTML = '';
   grid.style.gridTemplateColumns = `repeat(${gridSize}, 20px)`;
    
    for (let y = 0; y < gridSize; y++) {
      for (let x = 0; x < gridSize; x++) {
        const cell = createCell(x, y);
        grid.appendChild(cell);
      }
    }
  }

function createCell(x, y) {
    const cell = document.createElement('div');
    cell.className = 'cell';
    
    const isPlayer = x === players.find(player => player.x === x && player.y === y);
    const isMovementRange = players.showMovementRange && player1.isWithinMovementRange(x, y);
    
    if (isMovementRange) {
      cell.classList.add('movement-range');
    }
    
    if (isPlayer) {
      const playerElement = document.createElement('div');
      playerElement.className = 'player';
      playerElement.style.backgroundColor = player1.color;
      playerElement.addEventListener('dragstart', (e) => this.handleDragStart(e, x, y));
      cell.appendChild(playerElement);
    }
    
    cell.addEventListener('click', () => handleCellClick(x, y));
    // cell.addEventListener('dragover', (e) => e.preventDefault());
   // cell.addEventListener('drop', () => handleDrop(x, y));
    
    return cell;
  }

function handleDragStart(e, x, y) {
    if (x === player1.position.x && y === player1.position.y) {
      player1.isDragging = true;
      player1.showMovementRange = true;
      updateGrid();
    }
  }


function handleCellClick(x, y) {
    if (x === player1.position.x && y === player1.position.y) {
      player1.showMovementRange = !player1.showMovementRange;
    } else if (player1.showMovementRange && player1.isWithinMovementRange(x, y)) {
      player1.movePlayer(x, y);
    }
      updateGrid();
  }

class Player{
    constructor(x,y,color) {
    this.position = {x: x,y: y};
    this.movement = 5;
    this.showMovementRange = false;
    this.isDragging = false;
    this.color = color;
    this.draggable = false;
    
    }

    movePlayer(x,y){
      player1.position = { x, y };
      player1.showMovementRange = false;
    }

 
    isWithinMovementRange(x, y){
    const dx = Math.abs(x - player1.position.x);
    const dy = Math.abs(y - player1.position.y);
    return dx + dy <= this.movement;
    }

}
























  document.addEventListener('DOMContentLoaded', () => {
     container = document.getElementById('game-container');
    player1= new Player(10,10,'red');
    player2 = new Player(25,15,'blue');
    players = { player1, player2};
    createGrid();
  });
