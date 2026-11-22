const worksheet = document.getElementById("worksheet");
const printButton = document.getElementById("print-sheet");
const controls = worksheet.querySelectorAll("input, textarea, select");

function synchronizePrintValues() {
  for (const control of controls) {
    control.nextElementSibling.textContent = control.value;
  }
}

worksheet.addEventListener("submit", (event) => event.preventDefault());
worksheet.addEventListener("input", synchronizePrintValues);
worksheet.addEventListener("change", synchronizePrintValues);
window.addEventListener("beforeprint", synchronizePrintValues);

printButton.hidden = false;
printButton.addEventListener("click", () => {
  synchronizePrintValues();
  window.print();
});
