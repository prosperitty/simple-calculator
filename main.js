const calculatorKeys = document.querySelectorAll('button');
const display = document.querySelector('input');
const span = document.querySelector('span');
const operatorKeys = document.querySelectorAll('.operator-keys')
let displayInput = ``;
let isDecimal = false;
let displayValue = '';
let total = undefined;

const calculate = {
    add: function(a,b) {
        total = parseFloat(a) + parseFloat(b);
        total = Math.round(total * 10000 ) / 10000;
        updateDisplay(total);
    },
    subtract: function(a,b) {
        total = parseFloat(a) - parseFloat(b);
        total = Math.round(total * 10000 ) / 10000;
        updateDisplay(total);
    },
    multiply: function(a,b) {
        total = parseFloat(a) * parseFloat(b);
        total = Math.round(total * 10000 ) / 10000;
        updateDisplay(total);
    },
    divide: function(a,b) {
        if (b === 0 || b === '0') {
            clearEntry();
            displayInput = 'ERROR';
            span.innerText = displayInput;
            userInput.operand1 = undefined;
            return 'error';
        } else {
            total = parseFloat(a) / parseFloat(b);
            total = Math.round(total * 10000 ) / 10000
            updateDisplay(total);
        };
    },
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
                } else if(userInput.operator !== undefined) {
                    getSecondOperand(e);
                }
            } else if(e.target.matches('.operator-keys')) {
                storeValue(e);
                if(e.target.innerText === userInput.operator){
                    e.target.classList.add('selected');
                }
                removeToggle();
            } else if(e.target.matches('#total-key')) {
                if(userInput.operand1 !== undefined && userInput.operand2 !== undefined) {
                    getResults();   
                    userInput.operator = undefined;         
                    displayInput = displayInput + ' =';
                    span.innerText = displayInput;
                    removeToggle();
                }
            } else if (e.target.matches('#clear-key')) {
                if(userInput.operand2 !== undefined) {
                    userInput.operand2 = undefined;
                    clearEntry();
                } else {
                    clearEntry();
                }
            } else if(e.target.matches('#all-clear-key')) {
                for(const i in userInput) {
                    displayInput = '';
                    userInput[i] = undefined;
                    clearEntry();
                    removeToggle();
                    updateDisplay(displayValue);
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
        if(userInput.operand1 === undefined){
            userInput.operand1 = displayValue;
            storeOperator(e);
            clearEntry();
        } else {
            storeOperator(e);
            clearEntry();
        }
    } else if(userInput.operand2 !== undefined){
        getResults();
        displayInput = displayInput + ' =';
        span.innerText = displayInput;
        userInput.operator = undefined;
        storeOperator(e);
    }
};

const updateDisplay = function(value){
    display.value = value;
    if (userInput.operand1 !== undefined) {
        displayInput = `${userInput.operand1}`;
    } 
    if(userInput.operator !== undefined) {
        displayInput = displayInput + ` ${userInput.operator}`;
    }
    if(userInput.operand2 !== undefined) {
        displayInput = displayInput + ` ${userInput.operand2}`;
    }
    span.innerText = displayInput;
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

function removeToggle() {
    operatorKeys.forEach(e => {
        if(e.innerText !== userInput.operator) {
            e.classList.remove('selected');
        } 
    }) 
}

function runFunc() {
    getKey();
    updateDisplay(displayValue);
};

runFunc();