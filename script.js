function buildGridFromJSON(data) {
    data.nodes.forEach(node => {
        const [row, col] = node.position;
        grid[row][col] = { shape: node.shape, text: node.text };
    });
    links = data.links || [];
    createGrid();
}