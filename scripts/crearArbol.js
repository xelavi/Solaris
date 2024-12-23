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

    if (linkMode || unlinkMode) {
        handleLinkUnlink(row, col);
    } else {
        toggleShape(cell, row, col);
    }
}

function toggleShape(cell, row, col) {
    if (grid[row][col].shape === currentShape) {
        cell.innerHTML = '';
        grid[row][col] = { shape: null, text: '' };
        
    } else {
        cell.innerHTML = '';
        grid[row][col] = { shape: currentShape, text: '' };
        addShapeToCell(cell, currentShape, '');
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
    const data = {
        name: "",
        image: "",
        level: 0,
        job: "",
        background: "",
        martialStyle: "",
        atributePoints: 0,
        gridSize: GRID_SIZE,
        nodes: grid.flatMap((row, i) => 
            row.map((cell, j) => ({
                id: j*20+i,
                position: [i, j],
                shape: cell.shape,
                text: cell.text,
                active: false
            })).filter(cell => cell.shape)
        ),
        links: links
    };
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'grid-data.json';
    a.click();
    URL.revokeObjectURL(url);
}

function loadJSONFile(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const content = e.target.result;
            try {
                const data = JSON.parse(content);
                buildGridFromJSON(data);
            } catch (error) {
                console.error('Error parsing JSON:', error);
                alert('Invalid JSON file');
            }
        };
        reader.readAsText(file);
    }
}

function buildGridFromJSON(data) {
    GRID_SIZE = data.gridSize || 5;
    initializeGrid();
    data.nodes.forEach(node => {
        const [row, col] = node.position;
        grid[row][col] = { shape: node.shape, text: node.text };
    });
    links = data.links || [];
    createGrid();
}

function updateButtonStates() {
    document.getElementById('linkNodes').disabled = linkMode;
    document.getElementById('unlinkNodes').disabled = unlinkMode;
}

document.addEventListener('DOMContentLoaded', () => {
    initializeGrid();
    createGrid();
    document.getElementById('toggleShape').addEventListener('click', () => {
        currentShape = currentShape === 'circle' ? 'square' : 'circle';
        document.getElementById('toggleShape').textContent = `Switch to ${currentShape === 'circle' ? 'Square' : 'Circle'}`;
    });
    document.getElementById('linkNodes').addEventListener('click', () => {
        linkMode = true;
        unlinkMode = false;
        updateButtonStates();
    });
    document.getElementById('unlinkNodes').addEventListener('click', () => {
        unlinkMode = true;
        linkMode = false;
        updateButtonStates();
    });
    document.getElementById('downloadJSON').addEventListener('click', downloadJSON);
    document.getElementById('uploadJSON').addEventListener('change', loadJSONFile);
});