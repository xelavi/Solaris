        let GRID_SIZE = 20;
        let currentShape = 'circle';
        let linkMode = false;
        let unlinkMode = false;
        let grid = [];
        let links = [];
        
        
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

        function addShapeToCell(cell, shape, text) {
            const shapeElement = document.createElement('div');
            shapeElement.className = `shape ${shape}`;
            const input = document.createElement('input');
            input.type = 'text';
            input.value = text;
            input.readOnly = true;
            input.addEventListener('click', (e) => e.stopPropagation());
            input.addEventListener('input', (e) => {
                const row = parseInt(cell.dataset.row);
                const col = parseInt(cell.dataset.col);
                grid[row][col].text = e.target.value;
            });
            shapeElement.appendChild(input);
            cell.appendChild(shapeElement);
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
                    document.getElementById('points').innerText--;
                    addShapeToCell(cell, 'circle-enabled',grid[row][col].text);
                }
                else if(grid[row][col].shape === 'square'){
                    cell.innerHTML = '';
                    grid[row][col] = { shape: 'square-enabled', text: grid[row][col].text};
                    document.getElementById('points').innerText--;
                    addShapeToCell(cell, 'square-enabled', grid[row][col].text);
                }
                else if(grid[row][col].shape === 'circle-enabled'){
                    cell.innerHTML = '';
                    grid[row][col] = { shape: 'circle', text: grid[row][col].text, enabled: true };
                    document.getElementById('points').innerText++;
                    addShapeToCell(cell, 'circle',grid[row][col].text);
                }
                else if(grid[row][col].shape === 'square-enabled'){
                    cell.innerHTML = '';
                    grid[row][col] = { shape: 'square', text: grid[row][col].text, enabled: true };
                    document.getElementById('points').innerText++;
                    addShapeToCell(cell, 'square',grid[row][col].text);
                }

                
                
        }

        let selectedNodes = [];

        function handleLinkUnlink(row, col) {
            if (grid[row][col].shape) {
                selectedNodes.push({row, col});
                highlightCell(row, col);

                if (selectedNodes.length === 2) {
                    if (linkMode) {
                        linkNodes();
                    } else if (unlinkMode) {
                        unlinkNodes();
                    }
                    selectedNodes = [];
                    resetHighlights();
                    linkMode = false;
                    unlinkMode = false;
                    updateButtonStates();
                }
            }
        }

        function linkNodes() {
            const [node1, node2] = selectedNodes;
            if (!isAlreadyLinked(node1, node2)) {
                links.push({ from: node1, to: node2 });
                drawLine(node1, node2);
            }
        }

        function unlinkNodes() {
            const [node1, node2] = selectedNodes;
            links = links.filter(link => 
                !((link.from.row === node1.row && link.from.col === node1.col &&
                   link.to.row === node2.row && link.to.col === node2.col) ||
                  (link.from.row === node2.row && link.from.col === node2.col &&
                   link.to.row === node1.row && link.to.col === node1.col))
            );
            redrawAllLines();
        }

        function isAlreadyLinked(node1, node2) {
            return links.some(link => 
                (link.from.row === node1.row && link.from.col === node1.col &&
                 link.to.row === node2.row && link.to.col === node2.col) ||
                (link.from.row === node2.row && link.from.col === node2.col &&
                 link.to.row === node1.row && link.to.col === node1.col)
            );
        }

        function highlightCell(row, col) {
            const cell = document.querySelector(`.cell[data-row="${row}"][data-col="${col}"]`);
            if (cell) cell.style.outline = '2px solid green';
        }

        function resetHighlights() {
            const cells = document.querySelectorAll('.cell');
            cells.forEach(cell => cell.style.outline = '');
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

            function downloadJSON() {
                console.log(5);
                const data = {
                    name: document.getElementById('name').value,
                    level: document.getElementById('level').value,
                    job: document.getElementById('job').value,
                    background: document.getElementById('background').value,
                    martialStyle: document.getElementById('martialStyle').value,
                    raza: document.getElementById('race').value,
                    atributePoints: document.getElementById('points').value,
                    gridSize: GRID_SIZE,
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
             document.getElementById('safe').addEventListener('click', downloadJSON);
            });

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
        
        function updateLevel(event){
            
            let valor = document.getElementById('level').value*2+2;
            document.getElementById('points').innerText = valor;    
             
            console.log(5);
        }

        function loadJSONFile(event) {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    const content = e.target.result;
                    try {
                        const data = JSON.parse(content);
                        calculateNodes(data);
                    } catch (error) {
                        console.error('Error parsing JSON:', error);
                        alert('Invalid JSON file');
                    }
                };
                reader.readAsText(file);
            }
        }


        document.addEventListener('DOMContentLoaded', () => {
            initializeGrid();
            createGrid();
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
                document.getElementById('downloadJSON').addEventListener('click', downloadJSON);
                document.getElementById('level').addEventListener('input', updateLevel);
                document.getElementById('toggleShape').addEventListener('click', () => {
                    currentShape = currentShape === 'circle' ? 'square' : 'circle';
                    document.getElementById('toggleShape').textContent = `Switch to ${currentShape === 'circle' ? 'Square' : 'Circle'}`;
                });
          
           document.getElementById('uploadJSON').addEventListener('change', loadJSONFile);
        });

        