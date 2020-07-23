const calculatorKeys = document.querySelectorAll('button');
const display = document.querySelector('input');
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
                if(userInput.operand1 !== undefined) {
                    getSecondOperand(e);
                } else {
                    getFirstOperand(e);
                    console.log('getting first value');
                }
            } else if(e.target.matches('.operator-keys')) {
                storeValue(e);
            } else if(e.target.matches('#total-key')) {
                // getSecondOperand();
                operate(userInput.operand1,userInput.operand2,userInput.operator);
                userInput.operand2 = undefined;
                userInput.operand1 = total;
                updateDisplay(total);
            }
            console.log(displayValue);
        });
    });
};

const getFirstOperand = function(e) {
    displayValue = displayValue + e.target.innerText;
    updateDisplay(displayValue);
}

const getSecondOperand = function(e) {
    userInput.operand2 = displayValue + e.target.innerText
    updateDisplay(userInput.operand2);
    console.log('getting second value');
};

const storeValue = function(e){
    userInput.operator = e.target.innerText
    if(userInput.operand2 === undefined){
        if(userInput.operand1 === undefined ){
            userInput.operand1 = displayValue;
            displayValue = '';
            updateDisplay(displayValue);
        } else {
            displayValue = '';
            updateDisplay(displayValue);
            console.log('operand1 is filled');
        }
    } else if(userInput.operand1 && userInput.operand2 !== undefined){
        operate(userInput.operand1,userInput.operand2,userInput.operator);
        userInput.operand2 = undefined;
        userInput.operand1 = total;
        updateDisplay(total);
    }
};




function runfunc() {
    getKey();
}

runfunc();

// const getNumber1 = function() {
//     calculatorKeys.forEach(element => {
//         element.addEventListener('click', (e) => {
//             if(e.target.matches('.num-keys')){
//                 displayValue = displayValue + e.target.innerText;
//                 updateDisplay(displayValue);

//             }
//         });
//     }); 
// };

// const getNumber2 = function() {
//     calculatorKeys.forEach(element => {
//         element.addEventListener('click', (e) => {
//             if(e.target.matches('.num-keys')){
//                 // displayValue = displayValue + e.target.innerText;
//                 updateDisplay(displayValue);
//                 userInput.operand2 = displayValue;
//             };
//         });
//     }); 
// };

// const getOperator = function() {
//     calculatorKeys.forEach(element => {
//         element.addEventListener('click', (e) => {
//             if(e.target.matches('.operator-keys')){
//                 userInput.operand1 = displayValue
//                 displayValue = '';
//                 userInput.operator = e.target.innerText;
//                 // updateDisplay(displayValue);
//                 getNumber2();
//             }
//         });
//     }); 
// }

// const sum = function () {
//     this.addEventListener('click', (e) => {
//         if(e.target.innerText === '='){
//             operate(userInput.operand1, userInput.operand2, userInput.operator);
//             displayValue = '';
//             updateDisplay(total);
//         }
//     })
// }

const updateDisplay = function(value){
    display.value = value
}

// getNumber1();
// getOperator();
updateDisplay(displayValue);
// sum();
// operate(userInput.operand1, userInput.operand2, userInput.operator)