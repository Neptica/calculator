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

// TODO: Work with negative numbers
function updateDisplay() {
  const input = this.textContent;
  const alreadyHasOperator = operators.some((item) =>
    display.textContent.includes(item),
  );
  const operatorInput = operators.includes(input);

  if (input == "Enter" || (alreadyHasOperator && operatorInput)) {
    if (lastCharWasOp && operatorInput)
      display.textContent = display.textContent.slice(0, -1) + input;
    else if (operatorInput) {
      display.textContent = "Error";
      keepExistingText = false;
    } else {
      let [operand1, operand2, opcode] = splitString(display.textContent);
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

function splitString(string) {}

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
