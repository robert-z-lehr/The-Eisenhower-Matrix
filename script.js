// This line waits for the entire HTML document to load before running the JavaScript code.
document.addEventListener('DOMContentLoaded', () => {

  // These lines get the HTML elements for the matrix and the toggle button and store them in variables.
  const matrix = document.getElementById('matrix');
  const toggleMatrixButton = document.getElementById('toggleMatrix');

  // This variable keeps track of whether the matrix is 3x3 or not. It starts as true (meaning it is 3x3).
  let is3x3 = true;

  // This function will render (draw) the matrix on the webpage.
  const renderMatrix = () => {

    // This line clears any existing content in the matrix.
    matrix.innerHTML = '';

    // These lines decide the number of rows and columns based on whether it's a 3x3 or 4x4 matrix.
    const rows = is3x3 ? 3 : 4;
    const cols = is3x3 ? 3 : 4;

    // These arrays contain the titles for the cells in both 3x3 and 4x4 matrices.
    const titles3x3 = [['My Priorities', 'Urgent', 'Upcoming'], ['Important', '', ''], ['Unimportant', '', '']];
    const titles4x4 = [['My Priorities', 'Urgent', 'Upcoming', 'Later'], ['Important', '', '', ''], ['Less Important', '', '', ''], ['Unimportant', '', '', '']];

    // This line picks the correct titles based on whether it's a 3x3 or 4x4 matrix.
    const titles = is3x3 ? titles3x3 : titles4x4;

    // This line sets the layout for the matrix cells.
    matrix.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;

    // These loops go through each row and column to create the cells.
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {

        // This line creates a new 'div' element for each cell.
        const cell = document.createElement('div');

        // This line sets the class for styling the cell.
        cell.className = 'cell';

        // This line sets the content of the cell.
        cell.innerHTML = titles[i][j] || '<input type="checkbox"> ';

        // These lines make the first row and column cells uneditable and give them a 'title' class.
        if (i === 0 || j === 0) {
          cell.className += ' title';
          cell.contentEditable = false;
        } else {

          // These lines make the other cells editable.
          cell.contentEditable = true;

          // This event listener allows you to add checkboxes when you press 'Enter'.
          cell.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
              e.preventDefault();

              // These lines create and add the checkbox.
              const checkbox = document.createElement('input');
              checkbox.type = 'checkbox';
              checkbox.addEventListener('change', function() {
                if (this.checked) {
                  this.nextSibling.style.textDecoration = 'line-through';
                } else {
                  this.nextSibling.style.textDecoration = 'none';
                }
              });

              // These lines add a text node and a line break to the cell.
              const textNode = document.createElement('span');
              textNode.innerHTML = ' ';
              const br = document.createElement('br');
              cell.appendChild(br);
              cell.appendChild(checkbox);
              cell.appendChild(textNode);
            }
          });
        }

        // This line adds the cell to the matrix.
        matrix.appendChild(cell);
      }
    }
  };

  // This line initially renders the matrix.
  renderMatrix();

  // This event listener toggles between 3x3 and 4x4 matrices when the button is clicked.
  toggleMatrixButton.addEventListener('click', () => {
    is3x3 = !is3x3;
    renderMatrix();
  });

  // This section adds functionality to the 'Download Matrix' button.
  const downloadMatrixButton = document.getElementById("downloadMatrix");
  if (downloadMatrixButton) {  
    downloadMatrixButton.addEventListener("click", function() {

      // These lines create a new PDF document and add text to it.
      const { jsPDF } = window.jspdf;
      const doc = new jsPDF();
      doc.text("Eisenhower Matrix", 10, 10);
      doc.text(matrix.innerText, 10, 20);  // You can customize this part to format the matrix data as you like

      // This line saves the PDF with the name "Eisenhower-Matrix.pdf".
      doc.save("Eisenhower-Matrix.pdf");
    });
  }
});
