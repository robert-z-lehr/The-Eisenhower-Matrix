document.addEventListener('DOMContentLoaded', () => {
  const matrix = document.getElementById('matrix');
  const toggleMatrixButton = document.getElementById('toggleMatrix');

  const renderMatrix = (rows, cols) => {
    matrix.innerHTML = '';
    matrix.className = `matrix-${rows}x${cols}`;

    for (let i = 0; i <= rows; i++) {
      for (let j = 0; j <= cols; j++) {
        const cell = document.createElement('div');
        cell.className = 'cell';
        
        if (i === 0 || j === 0) {
          cell.className += ' title';
          cell.contentEditable = false;
        } else {
          cell.contentEditable = true;
          cell.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
              e.preventDefault();
              this.innerHTML += '<br>• ';
            }
          });
        }
        
        matrix.appendChild(cell);
      }
    }
  };

  // Initial 2x2 matrix
  renderMatrix(2, 2);

  toggleMatrixButton.addEventListener('click', () => {
    const is2x2 = matrix.className === 'matrix-2x2';
    renderMatrix(is2x2 ? 3 : 2, is2x2 ? 3 : 2);
  });
});
