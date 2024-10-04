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
let keepExistingText = false;
let lastCharWasOp = false;

function updateDisplay() {
  const input = this.textContent;
  const alreadyHasOperator = operators.some((item) =>
    display.textContent.includes(item),
  );
  const operatorInput = operators.includes(input);

  if (input == "Enter" || (alreadyHasOperator && operatorInput)) {
    if (lastCharWasOp && operatorInput) {
      display.textContent = display.textContent.slice(0, -1) + input;
    } else if (!lastCharWasOp) {
      let [operand1, operand2, opcode] = splitString(display.textContent);
      display.textContent = doMath(operand1, operand2, opcode);
      if (operatorInput) {
        display.textContent += input;
        lastCharWasOp = true;
      } else {
        keepExistingText = false;
      }
    }
  } else if (input === "Clear") {
    display.textContent = "";
    keepExistingText = false;
    lastCharWasOp = false;
  } else {
    if (keepExistingText) {
      if (operatorInput) lastCharWasOp = true;
      else lastCharWasOp = false;
      display.textContent += input;
      keepExistingText = true;
    } else if (!operatorInput) {
      display.textContent = input;
      keepExistingText = true;
      lastCharWasOp = false;
    }
  }
}

// TODO: Split strings
function splitString(string) {
  return ["3", "2", "+"];
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
