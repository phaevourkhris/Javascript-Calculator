const buttons = document.querySelector('.button-container');
const bufferDisplay = document.querySelector('#buffer-display');
let input = document.getElementById('input');
let buffer = 0;
let lastOperator;
input.value = 0;

const handleClick = function(value) {
    if(isNaN(parseInt(value))){
        handleOperators(value);
    }
    else{
        handleNumbers(value);
    }
}

const handleOperators = function(value){
    if(input.value !== '0'){
        switch(value){
            case 'C':
            input.value = 0;
            buffer = 0;
            bufferDisplay.innerHTML = '';
            break;

            case '←':
            if(input.value.length === 1){
                input.value = 0;
            }
            else{
                let newInput = input.value.slice(0, input.value.length-1);
                input.value = newInput;
            }
            break;

            case '÷':
            lastOperator = '/';
            performOperation(lastOperator);
            input.value = 0;
            break;

            case '×':
            lastOperator = '*';
            performOperation(lastOperator);
            input.value = 0;
            break;

            case '-':
            lastOperator = '-';
            performOperation(lastOperator);
            input.value = 0;
            break;

            case '+':
            lastOperator = '+';
            performOperation(lastOperator);
            input.value = 0;
            break;

            case '=':
            lastOperator = '=';
            buffer = eval(bufferDisplay.innerHTML+ input.value);
            input.value = buffer;
            bufferDisplay.innerHTML = '';
            break;

            case '.':
            if(!input.value.includes('.')){
                input.value += value;
            }
            break;
        }
    }
}

const handleNumbers = function(value){
    if(lastOperator === '=' || input.value === '0'){
        input.value = value;
    }
    else{
        input.value += value;
    }
}

const performOperation = function(value){
    
        if(bufferDisplay.innerHTML === ""){
            buffer = parseFloat(input.value);
            bufferDisplay.innerHTML = buffer +' '+value;
        }
        else{
            if(input.value === '0'){
                let bufferDisplayArray =bufferDisplay.innerHTML.split('');
                bufferDisplayArray[bufferDisplayArray.length-1] = value;
                bufferDisplay.innerHTML = bufferDisplayArray.join('');
            }
            else{
                buffer = eval(bufferDisplay.innerHTML+ input.value);
                bufferDisplay.innerHTML = buffer +' '+value;
            }
        }
        input.value = 0;
}
buttons.addEventListener('click', function(){
    handleClick(event.target.innerHTML);
});
