document.addEventListener('DOMContentLoaded', () => {
  const matrix = document.getElementById('matrix');
  const toggleMatrixButton = document.getElementById('toggleMatrix');
  let is3x3 = true;

  const renderMatrix = () => {
    matrix.innerHTML = '';
    const rows = is3x3 ? 3 : 4;
    const cols = is3x3 ? 3 : 4;

    const titles3x3 = [['My Priorities', 'Urgent', 'Upcoming'], ['Important', '', ''], ['Unimportant', '', '']];
    const titles4x4 = [['My Priorities', 'Urgent', 'Upcoming', 'Later'], ['Important', '', '', ''], ['Less Important', '', '', ''], ['Unimportant', '', '', '']];

    const titles = is3x3 ? titles3x3 : titles4x4;
    matrix.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        const cell = document.createElement('div');
        cell.className = 'cell';
        cell.innerHTML = titles[i][j] || '';

        if (i === 0 || j === 0) {
          cell.className += ' title';
          cell.contentEditable = false;
        } else {
          cell.contentEditable = true;
          
          cell.addEventListener('focus', function(e) {
            if (cell.innerHTML === '') {
              cell.innerHTML = '• ';
            }
          });

          cell.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
              e.preventDefault();
              const selection = window.getSelection();
              const range = selection.getRangeAt(0);
              const br = document.createElement("br");
              const textNode = document.createTextNode('• ');

            // Asynchronously execute this block
            setTimeout(() => {
              range.collapse(true);
              range.insertNode(br);
              range.setStartAfter(br);
              range.insertNode(textNode);
              range.setStartAfter(textNode);
              range.setEndAfter(textNode);
              selection.removeAllRanges();
              selection.addRange(range);
            }, 10);
            }
          });
        }
        matrix.appendChild(cell);
      }
    }
  };

  renderMatrix();

  toggleMatrixButton.addEventListener('click', () => {
    is3x3 = !is3x3;
    renderMatrix();
  });
});
