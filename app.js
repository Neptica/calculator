const controls = [
  ["Clear", "+/-", "^", "/"],
  ["7", "8", "9", "*"],
  ["4", "5", "6", "-"],
  ["1", "2", "3", "+"],
  ["0", ".", "", "Enter"],
];

const operators = ["^", "/", "*", "-", "+"];

const buttons = document.getElementById("button__container");
const display = document.getElementById("display__text");
let keepExistingText = true;
let lastCharWasOp = false;
let operand1 = null;
let operand2 = null;
let opcode = null;

function updateDisplay() {
  const input = this.textContent;
  const operatorInput = operators.includes(input);

  if (input === "+/-") {
    display.textContent = Number(display.textContent) * -1;
    keepExistingText = true;
  } else if (operatorInput && lastCharWasOp) {
    opcode = input;
  } else if ((input === "Enter" || operatorInput) && operand1 && opcode) {
    if (!lastCharWasOp) operand2 = display.textContent;
    display.textContent = doMath(operand1, operand2, opcode);
    keepExistingText = false;
    operand1 = display.textContent;
    if (operatorInput) {
      opcode = input;
      lastCharWasOp = true;
    } else opcode = null;
  } else if (input === "Clear") {
    display.textContent = "";
    operand1 = null;
    opcode = null;
    keepExistingText = true;
    lastCharWasOp = false;
  } else if (operatorInput || input !== "Enter") {
    if (operatorInput) {
      operand1 = display.textContent;
      opcode = input;
      keepExistingText = false;
      lastCharWasOp = true;
    } else if (keepExistingText) {
      display.textContent += input;
      lastCharWasOp = false;
    } else {
      display.textContent = input;
      keepExistingText = true;
      lastCharWasOp = false;
    }
  }
}

function doMath(op1, op2, opcode) {
  let answer = 0;
  op1 = Number(op1);
  op2 = Number(op2);
  switch (opcode) {
    case "+":
      answer = op1 + op2;
      break;
    case "-":
      answer = op1 - op2;
      break;
    case "*":
      answer = op1 * op2;
      break;
    case "/":
      answer = op1 / op2;
      break;
    case "^":
      answer = op1 ** op2;
      break;
  }
  return answer;
}

let divs = [];

for (const row of controls) {
  let rowDoc = document.createElement("div");
  rowDoc.classList.add("row");
  for (const ctrl of row) {
    let btn = document.createElement("button");
    btn.classList.add("button");
    btn.textContent = ctrl;
    btn.addEventListener("click", updateDisplay);
    rowDoc.appendChild(btn);
    divs.push(btn);
  }
  buttons.appendChild(rowDoc);
}
