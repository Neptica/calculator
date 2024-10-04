const controls = [
  ["Clear", "", "^", "/"],
  ["7", "8", "9", "*"],
  ["4", "5", "6", "-"],
  ["1", "2", "3", "+"],
  ["0", ".", "(-)", "Enter"],
];

const operators = ["^", "/", "*", "-", "+"];

const buttons = document.getElementById("button__container");
const display = document.getElementById("display__text");
let newString = true;

// TODO: Work with negative numbers
function updateDisplay() {
  const input = this.textContent;
  if (input == "Enter") {
    display.textContent = doMath(display.textContent);
    newString = true;
  } else if (input === "Clear") {
    display.textContent = "";
    newString = false;
  } else if (
    operators.includes(input) &&
    operators.some((item) => display.textContent.includes(item))
  ) {
    display.textContent = doMath(display.textContent) + input;
    newString = false;
  } else if (newString && !operators.includes(input)) {
    display.textContent = input;
    newString = false;
  } else {
    display.textContent += input;
    newString = false;
  }
}

function doMath(string) {
  const op = operators.filter((item) => string.includes(item))[0];
  const loc = string.indexOf(op);
  const operand1 = Number(string.slice(0, loc));
  const operand2 = Number(string.slice(loc + 1));
  let answer = 0;
  switch (op) {
    case "+":
      answer = operand1 + operand2;
      break;
    case "-":
      answer = operand1 - operand2;
      break;
    case "*":
      answer = operand1 * operand2;
      break;
    case "/":
      answer = operand1 / operand2;
      break;
    case "^":
      answer = operand1 ** operand2;
      break;
  }
  return answer;
}

for (const row of controls) {
  let rowDoc = document.createElement("div");
  rowDoc.classList.add("row");
  for (const ctrl of row) {
    let btn = document.createElement("button");
    btn.classList.add("button");
    btn.textContent = ctrl;
    btn.addEventListener("click", updateDisplay);
    rowDoc.appendChild(btn);
  }
  buttons.appendChild(rowDoc);
}
