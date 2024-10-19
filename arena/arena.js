const INITIAL_GRID_SIZE = 60;
const MOVEMENT_RANGE = 3;
let gridSize = INITIAL_GRID_SIZE;
//player position
let grid;
let container;
let players =  [];
let activePlayerIndex = 0;
let activePlayer;
let turnIndicator;

let showMovementRange = false;





function createGrid() {
    grid = document.createElement('div');
    grid.className = 'grid';
    container.appendChild(grid);
    createPlayerTurnIndicator();
    updateGrid();
  }

  function updateTurnIndicator() {
    activePlayer = players[activePlayerIndex];  
    turnIndicator.textContent = `Current Turn: ${activePlayer.color} player`;
    turnIndicator.style.color = activePlayer.color;
    showMovementRange = false;
  }

  function createPlayerTurnIndicator() {
    turnIndicator = document.createElement('div');
    turnIndicator.className = 'turn-indicator';
    container.insertBefore(turnIndicator, grid);
    updateTurnIndicator();
  }

  function moveActivePlayer(x, y) {
    const activePlayer = players[activePlayerIndex];
    activePlayer.position.x = x;
    activePlayer.position.y = y;
    players[activePlayerIndex].showMovementRange = false;

    if(activePlayer.actionsLeft == 1){
    activePlayerIndex = (activePlayerIndex + 1) % players.length;
    activePlayer.actionsLeft = players.actions;
    }
    else{
        activePlayer.actionsLeft--;
    }

    updateTurnIndicator();
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

  function getPlayerAt(x, y) {
    
    return players.find(player => player.position.x === x && player.position.y === y);
  }

function createCell(x, y) {
    const cell = document.createElement('div');
    cell.className = 'cell';
    
    const isPlayer = getPlayerAt(x,y);
    
    const isMovementRange = showMovementRange && isWithinMovementRange(x, y);
    
    if (isMovementRange) {
      cell.classList.add('movement-range');
    }
    
    if (isPlayer) {
      for(let i=0;i<players.length;i++){
        if(players[i].position.x === x && players[i].position.y === y){
          cell.appendChild(players[i].Element);
          
        }
      }
      
    }
    cell.addEventListener('click', () => handleCellClick(x, y));
   

    
    
    return cell;
  }




function handleCellClick(x, y) {
  const activePlayer = players[activePlayerIndex];
  if (x === activePlayer.position.x && y === activePlayer.position.y) {
    showMovementRange = !showMovementRange;
  } else if (showMovementRange && isWithinMovementRange(x, y)) {
    moveActivePlayer(x, y);
   
  }
  updateGrid();
  }

  function isWithinMovementRange(x, y){
    const dx = Math.abs(x - players[activePlayerIndex].position.x);
    const dy = Math.abs(y - players[activePlayerIndex].position.y);
    return dx + dy <= players[activePlayerIndex].movement;
    }


class Player{
    constructor(x,y,color) {
    this.position = {x: x,y: y};
    this.movement = 5;
    this.showMovementRange = false;
    this.color = color;
    this.Element = document.createElement('div');
    this.Element.className = 'player';
    this.Element.style.backgroundColor = color;
    this.actions = 3;
    this.actionsLeft = 3;
    this.hp;
    this.dodge;
    this.resistance;
    this.deadlift;
    this.initiative;
    this.deadeye;
    this.tohit;

    
    }

    movePlayer(x,y){
      this.position = { x, y };
      this.showMovementRange = false;
    }

  

    calculateStats(data){
        this.hp =data.hp;
    }

     
 
   
}




















function loadJSONFile(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const content = e.target.result;
            try {
                const data = JSON.parse(content);
                this.calculateStats(data);
            } catch (error) {
                console.error('Error parsing JSON:', error);
                alert('Invalid JSON file');
            }
        };
        reader.readAsText(file);
    }
}


let menuOpen = false;
let crearPJ = false;
function abrirCerrarMenu(event){
    if(menuOpen){
        document.getElementById('menu').style.display = 'none';
    }
    else{
        document.getElementById('menu').style.display = 'block';
    }
}
let gridCreated = false;

function abrirCerrarCrearPJ(event){
    if(crearPJ) document.getElementById('creacionPJ').style.display = 'none';
    else document.getElementById('creacionPJ').style.display = 'block';
}
function addCharacter(){
   
    let x = document.getElementById('x').value;
    let y = document.getElementById('x').value;
    let color = document.getElementById('color').value;
    players.push(new Player(10,1,'red'));
    players.push(new Player(10,5,'blue'));
    if(!gridCreated) {
        createGrid();
        gridCreated = true;
    }
    updateGrid();
    
}


  document.addEventListener('DOMContentLoaded', () => {

  document.getElementById('MenuBtn').addEventListener('click', abrirCerrarMenu);
  document.getElementById('MenuCrearPJ').addEventListener('click', abrirCerrarCrearPJ);
  document.getElementById('addPJ').addEventListener('click', addCharacter);
  container = document.getElementById('game-container');
    
  });
