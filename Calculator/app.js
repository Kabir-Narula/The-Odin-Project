let numberButtons = document.querySelectorAll('.number-btn');
let operatorButtons = document.querySelectorAll('.operator-btn');
let totalButton = document.querySelector('#total-btn');
let deleteButton = document.querySelector('#delete-btn');
let clearButton = document.querySelector('#clear-btn');
let decimalButton = document.querySelector('#decimal-btn');
let display = document.querySelector('#number-display');
let currentNum = '';
let lastNum;
let operator;

/* four operations functions */

function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    return num1 / num2;
}

/* other functions */

function operate(num1, num2, operator) {
    if ((num1 == 0 || num2 == 0) && operator == divide) {
        return 'Error';
    }
    return operator(num1, num2);
}


function checkOperator(string) {
    switch (string) {
        case 'add':
            return add;
        case 'subtract':
            return subtract;
        case 'multiply':
            return multiply;
        case 'divide':
            return divide;
    }
}

function displayNumber(number = '') {
    if (number.includes('.')) {
        // if number is a decimal
        display.textContent = Number(number).toPrecision(3);
    } else {
        display.textContent = number;
    }
}

function addNumber(e) {
    currentNum += this.textContent;
    display.textContent = currentNum;
}

function addDecimal(e) {
    currentNum += this.textContent;
    display.textContent = currentNum;
    this.disabled = true;
}

function delResult(e) {
    if (currentNum != '') {
        // convert this as an array
        currentNum = currentNum.split('');
        // remove the last element
        currentNum.pop();
        // join together
        currentNum = currentNum.join('');
        // activates decimal button again if '.' was deleted
        if (!currentNum.includes('.')) {
            decimalButton.disabled = false;
        }

        display.textContent = currentNum;
    }
}

function addOperator(e) {
    if (currentNum != '') {
        if (operator) {
            // If there's already an operator, calculate the result
            calcAndResult();
            resetDisplay();
            // Save the next operator for the next operation
            operator = this.getAttribute('value');
        }
        if (!operator) {
            // If there's not an operator, add it to use it later
            operator = this.getAttribute('value');
            lastNum = +currentNum;
            resetDisplay();
        }
    }
}

function calcAndResult() {
    lastNum = operate(lastNum, +currentNum, checkOperator(operator));
    lastNum = lastNum.toString().split('').includes('.')
        ? lastNum.toPrecision(3).toString()
        : lastNum.toString();
    displayNumber(lastNum);
}

function resetDisplay() {
    currentNum = '';
}

function totalResult(e) {
    if (operator && currentNum != '') {
        // If there's already an operator, calculate the result
        calcAndResult();
        currentNum = lastNum;
        // Reset the operator
        operator = false;
        // Disable decimal button if result contains decimals
        if (currentNum.includes('.')) decimalButton.disabled = true;
    }
}


function clearResult() {
    if (currentNum != '') {
        lastNum = undefined;
        resetDisplay();
        displayNumber(currentNum);
        decimalButton.disabled = false;
    }
}

function clickButton(button) {
    button.click();
    button.classList.toggle('focus');
    setTimeout(() => {
        button.classList.toggle('focus');
    }, 120);
}


numberButtons.forEach((button) => button.addEventListener('click', addNumber));
operatorButtons.forEach((button) => button.addEventListener('click', addOperator));
totalButton.addEventListener('click', totalResult);
deleteButton.addEventListener('click', delResult);
clearButton.addEventListener('click', clearResult);
decimalButton.addEventListener('click', addDecimal);

window.addEventListener('keydown', keyboardSupport);
