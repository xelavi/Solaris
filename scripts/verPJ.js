let level = 0;
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

let skillpoints = 0;



let GRID_SIZE = 20;
let currentShape = 'circle';
let linkMode = false;
let unlinkMode = false;
let grid = [];
let links = [];

  function loadJSONFile(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const content = e.target.result;
            try {
                const data = JSON.parse(content);
                calculateNodes(data);
                buildGridFromJSON(data);
            } catch (error) {
                console.error('Error parsing JSON:', error);
                alert('Invalid JSON file');
            }
        };
        reader.readAsText(file);
    }
}


    function calculateNodes(data) {

        
       document.getElementById('name').value = data.name;
        document.getElementById('job').value = data.job;
        level = document.getElementById('level').value = data.level;
        document.getElementById('background').value = data.background;
        document.getElementById('martialStyle').value = data.martialStyle;
        document.getElementById('race').value = data.race;
     data.nodes.forEach(node => {
        
            if(node.shape == 'circle-enabled'){
                
               calculateStats(node.text,true);
            }

        })
   //   calculateStats();
 calculateSkillPoints();
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
        document.getElementById('toHitB').innerText = (level*1 + body*1);
        document.getElementById('toHitA').innerText = (level*1 + agility*1);

        
    }



    //ARBOL

    function initializeGrid() {
        grid = Array(GRID_SIZE).fill().map(() => Array(GRID_SIZE).fill({ shape: null, text: '' }));
    }
    
    function createGrid() {
        const gridElement = document.getElementById('grid');
        gridElement.innerHTML = ''; // Clear existing grid
        gridElement.style.gridTemplateColumns = `repeat(${GRID_SIZE}, 50px)`;
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

    function handleCellClick(event) {
        const cell = event.currentTarget;
        const row = parseInt(cell.dataset.row);
        const col = parseInt(cell.dataset.col);
        toggleShape(cell, row, col);
        
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
        calculateSkillPoints();
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
    
        const length = Math.sqrt(Math.pow(to.col - from.col, 2) + Math.pow(to.row - from.row, 2)) * 50;
        const angle = Math.atan2(to.row - from.row, to.col - from.col) * 180 / Math.PI;
    
        line.style.width = `${length}px`;
        line.style.height = '2px';
        line.style.left = `${fromRect.left - gridRect.left + 25}px`;
        line.style.top = `${fromRect.top - gridRect.top + 25}px`;
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
    function buildGridFromJSON(data) {
        GRID_SIZE = data.gridSize || 20;
        initializeGrid();
        data.nodes.forEach(node => {
            const [row, col] = node.position;
            grid[row][col] = { shape: node.shape, text: node.text};
        });
        links = data.links || [];
        createGrid();
    } 
    let boolinput = 0;
    function updateLevel(event){
        level = (document.getElementById('level').value);
        console.log(level);
        calculateStats();
        calculateSkillPoints();
    }

    //Cada cop que canvii el nivell, un node, os es cargui un json
    function calculateSkillPoints(){
        skillpoints=0;
        for (let i = 0; i < GRID_SIZE; i++) {
            for (let j = 0; j < GRID_SIZE; j++) {
                if(grid[i][j].shape == 'circle-enabled' ||  grid[i][j].shape == 'square-enabled') skillpoints++;
            }
        }
        document.getElementById('skillPoint').innerText = 2+(level*2) - skillpoints;
    }

    function downloadJSON() {
        console.log(6);
        const data = {
            name: document.getElementById('name').value,
            level: document.getElementById('level').value,
            job: document.getElementById('job').value,
            background: document.getElementById('background').value,
            martialStyle: document.getElementById('martialStyle').value,
            raza: document.getElementById('race').value,
            atributePoints: document.getElementById('skillPoint').value,

            nodes: grid.flatMap((row, i) => 
                row.map((cell, j) => ({
                    position: [i, j],
                    shape: cell.shape,
                    text: cell.text
                })).filter(cell => cell.shape)
            ),
            links: links
        };
        const json = JSON.stringify(data, null, 2);
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        let nombre = document.getElementById('name').value;
        a.download = 'data.json';
        a.click();
        URL.revokeObjectURL(url);
    }

    document.addEventListener('DOMContentLoaded', () => {
         initializeGrid();
         fetch('./json/atributos.json')
         .then(response => {
             if (!response.ok) {
                 throw new Error('Failed to load the JSON file: ' + response.statusText);
             }
             return response.json(); // Parse the JSON
         })
         .then(data => {
              buildGridFromJSON(data);
 
         });
         calculateSkillPoints();
        document.getElementById('downloadJSON').addEventListener('click', downloadJSON);
        document.getElementById('level').addEventListener('input', updateLevel);  
        document.getElementById('uploadJSON').addEventListener('change', loadJSONFile);
     });

 