const calculatorKeys = document.querySelectorAll('button');
const display = document.querySelector('input');
let isDecimal = false;
let displayValue = '';
let total = undefined;

const calculate = {
    add: function(a,b) {
        total = parseFloat(a) + parseFloat(b);
        updateDisplay(total);
    },
    subtract: function(a,b) {
        total = parseFloat(a) - parseFloat(b);
        updateDisplay(total);
    },
    multiply: function(a,b) {
        total = parseFloat(a) * parseFloat(b);
        updateDisplay(total);
    },
    divide: function(a,b) {
        if (b === 0) {
            return 'error';
        } else {
            total = parseFloat(a) / parseFloat(b);
            updateDisplay(total);
        };
    },
};

const operators = {
    '&plus': 'add',
    '&minus': 'subtract',
    '&multiply': 'multiply',
    '&divide': 'divide',
};

const userInput = {
    operand1: undefined,
    operand2: undefined,
    operator: undefined,
};

const operate = function(a, b, operator) {
    switch(operator){
        case '+':
           calculate.add(a,b);
            break;
        case '−':
           calculate.subtract(a,b);
            break;
        case '×':
           calculate.multiply(a,b);
            break;
        case '÷':
           calculate.divide(a,b);
            break;
       default:
           console.log('error');
           break;
    }
};

const getKey = function() {
    calculatorKeys.forEach(element => {
        element.addEventListener('click', (e) => {     
            if(e.target.matches('.num-keys')) {
                if(userInput.operand1 === undefined) {
                    getFirstOperand(e);
                } else if((userInput.operand1 && userInput.operator) !== undefined) {
                    getSecondOperand(e);
                }
            } else if(e.target.matches('.operator-keys')) {
                storeValue(e);
            } else if(e.target.matches('#total-key')) {
                getResults();       
                userInput.operator = undefined;         
            } else if (e.target.matches('#clear-key')) {
                if(userInput.operand2 !== undefined) {
                    userInput.operand2 = undefined;
                    clearEntry();
                } else {
                    clearEntry();
                }
            } else if(e.target.matches('#all-clear-key')) {
                for(const i in userInput) {
                    userInput[i] = undefined;
                    clearEntry();
                }
            } else if(e.target.matches('#decimal-key')) {
                if(!displayValue.includes('.')) {
                    addDecimal(e);
                } else {
                    console.log('decimal already present');
                }
            }
            console.log(displayValue);
            console.log(userInput);
        });
    });
};

const storeValue = function(e){
    if(userInput.operand2 === undefined){
        if(userInput.operand1 === undefined ){
            storeOperator(e);
            userInput.operand1 = displayValue;
            displayValue = '';
            updateDisplay(displayValue);
        } else {
            storeOperator(e);
            displayValue = '';
            updateDisplay(displayValue);
        }
    } else if(userInput.operand1 && userInput.operand2 !== undefined){
        getResults();
        storeOperator(e);
        userInput.operator = undefined;
    }
};

const updateDisplay = function(value){
    display.value = value;
};

const getFirstOperand = function(e) {
    displayValue = displayValue + e.target.innerText;
    updateDisplay(displayValue);
};

const getSecondOperand = function(e) {
    displayValue = displayValue + e.target.innerText;
    userInput.operand2 = displayValue;
    updateDisplay(displayValue);
};

const getResults = function() {
    operate(userInput.operand1,userInput.operand2,userInput.operator);
    displayValue = '';
    userInput.operand2 = undefined;
    userInput.operand1 = total;
};

const clearEntry = function() {
    displayValue = '';
    updateDisplay(displayValue);
}

const addDecimal = function(e) {
    displayValue = displayValue + e.target.innerText;
    updateDisplay(displayValue);
};

const storeOperator = function(e) {
    userInput.operator = e.target.innerText;
};

function runFunc() {
    getKey();
    updateDisplay(displayValue);
};

runFunc();