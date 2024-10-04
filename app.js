const controls = [
  ["", "", "^", "/"],
  ["7", "8", "9", "x"],
  ["4", "5", "6", "-"],
  ["1", "2", "3", "+"],
  ["0", ".", "(-)", "Enter"],
];

const buttons = document.getElementById("button__container");

for (const row of controls) {
  let rowDoc = document.createElement("div");
  rowDoc.classList.add("row");
  for (const ctrl of row) {
    let btn = document.createElement("button");
    btn.classList.add("button");
    btn.textContent = ctrl;
    rowDoc.appendChild(btn);
  }
  buttons.appendChild(rowDoc);
}
