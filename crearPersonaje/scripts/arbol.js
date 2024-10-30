let level = 1;
let body=0;
    let hp = 0;
    let resistance = 0;
    let cc = 0;
    let deadlift = 0;
    let movement = 0;
let agility = 0;
    let dodge = 0;
    let initiative = 0;
    let actions = 0;
    let deadeye = 0;
let mind = 0;

let skillpoint = 0;
let skill = 0;
let willpower =0;
let cellsize = 50;
let GRID_SIZE = 20;
let currentShape = 'circle';
let linkMode = false;
let unlinkMode = false;
let grid = [];
let links = [];

const stylesheet = document.styleSheets[0];

function calculateNodes(data) {
    
  data.nodes.forEach(node => {
   
         if(node.shape == 'circle-enabled'){
            console.log(2); 
            calculateStats(node.text,true);
         }
     });
 }
function calculateStats(text,enabled){




      
        
    if(enabled){
        if(text=='HP') hp++;
        if(text=='B') body++;
        if(text=='R') resistance++;
        if(text=='M') movement++;
        if(text=='DL') deadlift++;
        if(text=='A') agility++;
        if(text=='INI') initiative++;
        if(text=='DE') deadeye++;
        if(text=='AC') dodge++;
        if(text=='H') skillpoint++;
        if(text=='H++') skill++;
        if(text=='WP') willpower++;
        if(text=='MIND') mind++;
    }
    else{
        if(text=='HP') hp--;
        if(text=='B') body--;
        if(text=='R') resistance--;
        if(text=='M') movement--;
        if(text=='DL') deadlift--;
        if(text=='A') agility--;
        if(text=='INI') initiative--;
        if(text=='DE') deadeye--;
        if(text=='AC') dodge--;
        if(text=='H') skillpoint--;
        if(text=='H++') skill--;
        if(text=='WP') willpower--;
        if(text=='MIND') mind--;
    }


        //HP
        document.getElementById('hp').innerText = 12 + (hp*12) + (level*2) + (body*level);
        //RESISTANCE
        document.getElementById('resistance').innerText = (resistance*3)+(body*3);
        //MOVEMENT SPEED
        document.getElementById('movement').innerText = 3 + body + movement;
        //DEADLIFT
        document.getElementById('deadlift').innerText = (deadlift*3)+(body*3);
        //CC
        document.getElementById('cc').innerText = 0;
        //DODGE
        document.getElementById('dodge').innerText = 12+(dodge*3)+(agility*3);
        //INITIATIVE
        document.getElementById('initiative').innerText = (initiative*3)+(agility*3);
        //ACTIONS
        document.getElementById('actions').innerText = 3;
        //DEADEYE
        document.getElementById('deadeye').innerText = (deadeye*3)+(agility*3);
        //TO HIT
        
        let skillpoints = level*2 + mind*2 + 4*skillpoint;

        document.getElementById('body').innerText = body;
        document.getElementById('agility').innerText = agility;
        document.getElementById('mind').innerText = mind;
        document.getElementById('skillpoints').innerText = level*2+mind*2+4*skillpoint;
        document.getElementById('willpower').innerText = mind+willpower;
        
        let data = {
            skillpoints: skillpoints,
            body: body,
            mind: mind,
            agility: agility
        };
        const json = JSON.stringify(data, null, 2);
        localStorage.setItem("skillsAtr",json);

    }


function initializeGrid() {
    grid = Array(GRID_SIZE).fill().map(() => Array(GRID_SIZE).fill({ shape: null, text: '' }));
}

function handleCellClick(event) {
    const cell = event.currentTarget;
    const row = parseInt(cell.dataset.row);
    const col = parseInt(cell.dataset.col);
    toggleShape(cell, row, col);
    
}

function createGrid() {
    const gridElement = document.getElementById('grid');
    gridElement.innerHTML = ''; // Clear existing grid
    gridElement.style.gridTemplateColumns = `repeat(${GRID_SIZE}, 40px)`;
    for (let i = 0; i < GRID_SIZE; i++) {
        for (let j = 0; j < GRID_SIZE; j++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.dataset.row = i;
            cell.dataset.col = j;
           cell.addEventListener('click', handleCellClick);
            gridElement.appendChild(cell);
            if (grid[i][j].shape) {
                addShapeToCell(cell, grid[i][j].shape, grid[i][j].text);
            }
        }
    }
    redrawAllLines();
}

function toggleShape(cell, row, col) {
      
    if (grid[row][col].shape === 'circle') {
        cell.innerHTML = '';
        grid[row][col] = { shape: 'circle-enabled', text: grid[row][col].text };
        addShapeToCell(cell, 'circle-enabled',grid[row][col].text);
        calculateStats(grid[row][col].text,true);
    }
    else if(grid[row][col].shape === 'square'){
        cell.innerHTML = '';
        grid[row][col] = { shape: 'square-enabled', text: grid[row][col].text};
        addShapeToCell(cell, 'square-enabled', grid[row][col].text);
        calculateStats(grid[row][col].text,true);
    }
    else if(grid[row][col].shape === 'circle-enabled'){
        console.log(row,col);
        cell.innerHTML = '';
        grid[row][col] = { shape: 'circle', text: grid[row][col].text, enabled: true };
        addShapeToCell(cell, 'circle',grid[row][col].text);
        calculateStats(grid[row][col].text,false);
    }
    else if(grid[row][col].shape === 'square-enabled'){
        cell.innerHTML = '';
        grid[row][col] = { shape: 'square', text: grid[row][col].text, enabled: true };
        addShapeToCell(cell, 'square',grid[row][col].text);
        calculateStats(grid[row][col].text,false);

    }
   
    
    
}

function addShapeToCell(cell, shape, text) {
    const shapeElement = document.createElement('div');
    shapeElement.className = `shape ${shape}`;
    
    const input = document.createElement('input');
    input.type = 'text';
    input.value = text;
    input.readOnly = true;
  //  input.addEventListener('click', (e) => e.stopPropagation());
    input.addEventListener('input', (e) => {
        const row = parseInt(cell.dataset.row);
        const col = parseInt(cell.dataset.col);
        grid[row][col].text = e.target.value;
    });
    shapeElement.appendChild(input);
    cell.appendChild(shapeElement);
}

function linkNodes() {
    const [node1, node2] = selectedNodes;
    if (!isAlreadyLinked(node1, node2)) {
        links.push({ from: node1, to: node2 });
        drawLine(node1, node2);
    }
}

function isAlreadyLinked(node1, node2) {
    return links.some(link => 
        (link.from.row === node1.row && link.from.col === node1.col &&
         link.to.row === node2.row && link.to.col === node2.col) ||
        (link.from.row === node2.row && link.from.col === node2.col &&
         link.to.row === node1.row && link.to.col === node1.col)
    );
}

function drawLine(from, to) {
    const gridElement = document.getElementById('grid');
    const line = document.createElement('div');
    line.className = 'line';
    const fromRect = gridElement.children[from.row * GRID_SIZE + from.col].getBoundingClientRect();
    const toRect = gridElement.children[to.row * GRID_SIZE + to.col].getBoundingClientRect();
    const gridRect = gridElement.getBoundingClientRect();

    const length = Math.sqrt(Math.pow(to.col - from.col, 2) + Math.pow(to.row - from.row, 2)) * 40;
    const angle = Math.atan2(to.row - from.row, to.col - from.col) * 180 / Math.PI;

    line.style.width = `${length}px`;
    line.style.height = '2px';
    line.style.left = `${fromRect.left - gridRect.left + 20}px`;
    line.style.top = `${fromRect.top - gridRect.top + 20}px`;
    line.style.transform = `rotate(${angle}deg)`;
    line.style.transformOrigin = '0 0';

    gridElement.appendChild(line);
}

function redrawAllLines() {
    const gridElement = document.getElementById('grid');
    const existingLines = gridElement.querySelectorAll('.line');
    existingLines.forEach(line => line.remove());
    links.forEach(link => drawLine(link.from, link.to));
}

function buildGridFromJSON(data,backgrounddata) {
    GRID_SIZE = data.gridSize || 20;
    initializeGrid();

    console.log(backgrounddata.nodes[0].position[0]);
    data.nodes.forEach(node => {    
        const [row, col] = node.position;
        if(backgrounddata.nodes[0].position[0] == row && backgrounddata.nodes[0].position[1] == col){
            grid[backgrounddata.nodes[0].position[0]][backgrounddata.nodes[0].position[1]] = {shape: 'circle-enabled', text: node.text};
        }
        else if(backgrounddata.nodes[1].position[0] == row && backgrounddata.nodes[1].position[1] == col){
            grid[backgrounddata.nodes[1].position[0]][backgrounddata.nodes[1].position[1]] = {shape: 'circle-enabled', text: node.text};
        }
        else{
        grid[row][col] = { shape: node.shape, text: node.text};
        }
    });
    
  //  
   
    
  
    
    links = data.links || [];
    createGrid();
} 
let boolinput = 0;



document.addEventListener('DOMContentLoaded', () => {
    initializeGrid();

    const storedData = JSON.parse(localStorage.getItem("userData"));
    let background = storedData.background;
    fetch('./json/'+ background +'.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to load the JSON file: ' + response.statusText);
        }
        return response.json(); // Parse the JSON
    })
    .then(backgrounddata => {
        fetch('./json/atributos.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to load the JSON file: ' + response.statusText);
            }
            return response.json(); // Parse the JSON
        })
        .then(data => {
            buildGridFromJSON(data,backgrounddata);
            calculateNodes(data);
        });
    });

   

  
});