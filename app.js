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
  this.focus();
  const input = this.textContent;
  const operatorInput = operators.includes(input);

  if (input === "+/-") {
    display.textContent = Number(display.textContent) * -1;
    keepExistingText = true;
  } else if (operatorInput && lastCharWasOp) {
    if (operatorInput) colorOp(input);
    opcode = input;
  } else if ((input === "Enter" || operatorInput) && operand1 && opcode) {
    if (!lastCharWasOp) {
      colorOp("white"); // no button will match white
      operand2 = display.textContent;
      const answer = doMath(operand1, operand2, opcode);
      if (!isNaN(answer) && Number.isFinite(answer))
        display.textContent = answer;
      else if (!Number.isFinite(answer)) display.textContent = "Divide By Zero";
      else display.textContent = "Error";
      keepExistingText = false;
      operand1 = display.textContent;
    }
    if (operatorInput) {
      colorOp(input);
      opcode = input;
      lastCharWasOp = true;
    }
  } else if (input === "Clear") {
    colorOp("white"); // no button will match white
    display.textContent = "";
    operand1 = null;
    operand2 = null;
    opcode = null;
    keepExistingText = true;
    lastCharWasOp = false;
  } else if (operatorInput || input !== "Enter") {
    if (
      operatorInput &&
      display.textContent !== "Error" &&
      display.textContent !== ""
    ) {
      colorOp(input);
      operand1 = display.textContent;
      opcode = input;
      keepExistingText = false;
      lastCharWasOp = true;
    } else if (
      keepExistingText &&
      display.textContent != "Error" &&
      !operatorInput
    ) {
      display.textContent += input;
      lastCharWasOp = false;
    } else if (!operatorInput) {
      colorOp("white"); // no button will match white
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

const keyboardEquivalent = [
  "Backspace",
  "_",
  "^",
  "/",
  "7",
  "8",
  "9",
  "*",
  "4",
  "5",
  "6",
  "-",
  "1",
  "2",
  "3",
  "+",
  "0",
  ".",
  "",
  "Enter",
];

let divs = [];
let i = 0;

for (const row of controls) {
  let rowDoc = document.createElement("div");
  rowDoc.classList.add("row");
  for (const ctrl of row) {
    let btn = document.createElement("button");
    btn.classList.add("button");
    btn.textContent = ctrl;
    btn.addEventListener("click", updateDisplay);
    rowDoc.appendChild(btn);
    divs.push([keyboardEquivalent[i++], btn]);
  }
  buttons.appendChild(rowDoc);
}

document.addEventListener("keydown", (event) => {
  for (const btn of divs) {
    if (btn[0] === event.key) btn[1].click();
  }
  console.log(event.key);
});

function colorOp(content) {
  for (let btn of divs) {
    btn[1].style.backgroundColor = "white";
    if (btn[1].textContent === content) btn[1].style.backgroundColor = "orange";
  }
}
