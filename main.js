const calculatorKeys = document.querySelectorAll('button');
const display = document.querySelector('input');
let displayValue = '';
let total = undefined;

const calculate = {
    add: function(a,b) {
        total = parseInt(a) + parseInt(b);
        updateDisplay(total);
    },
    subtract: function(a,b) {
        total = parseInt(a) - parseInt(b);
        updateDisplay(total);
    },
    multiply: function(a,b) {
        total = parseInt(a) * parseInt(b);
        updateDisplay(total);
    },
    divide: function(a,b) {
        if (b === 0) {
            return 'error';
        } else {
            total = parseInt(a) / parseInt(b);
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
           console.log(operand2);
           break;
    }
};

const getKey = function() {
    calculatorKeys.forEach(element => {
        element.addEventListener('click', (e) => {     
            if(e.target.matches('.num-keys')) {
                displayValue = displayValue + e.target.innerText;
                updateDisplay(displayValue);
            } else if(e.target.matches('.operator-keys')) {
                userInput.operator = e.target.innerText
                if(userInput.operand2 === undefined){
                    if(total === undefined){
                        userInput.operand1 = displayValue;
                        displayValue = '';
                    } else {
                        displayValue = '';
                        console.log('total is filled');
                    }
                } 
            } else if(e.target.matches('#total-key')) {
                userInput.operand2 = displayValue;
                operate(userInput.operand1,userInput.operand2,userInput.operator);
                userInput.operand2 = undefined;
                userInput.operand1 = total;
            }
        });
    });
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