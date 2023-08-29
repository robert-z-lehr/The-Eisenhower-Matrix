let layout = '2x2';

function switchLayout() {
  const matrix = document.getElementById('matrix');
  if (layout === '2x2') {
    layout = '3x3';
    matrix.className = 'matrix-3x3';
    // Additional logic to change the matrix to 3x3
  } else {
    layout = '2x2';
    matrix.className = 'matrix-2x2';
    // Additional logic to change the matrix back to 2x2
  }
}

function generatePDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  doc.text("Eisenhower Matrix", 10, 10);
  // Additional logic to populate the matrix into the PDF
  doc.save("Eisenhower-Matrix.pdf");
}
