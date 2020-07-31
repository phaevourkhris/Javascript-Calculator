const buttons = document.querySelector('.button-container');
const bufferDisplay = document.querySelector('#buffer-display');
let input = document.getElementById('input');
let buffer = 0;
let lastOperator;
input.innerHTML = '0';

const handleClick = function(value) {
    if(isNaN(parseInt(value))){
        handleOperators(value);
    }
    else{
        handleNumbers(value);
    }
}

const handleOperators = function(value){
        switch(value){
            case 'C':
            bufferDisplay.innerHTML = "";
            input.innerHTML = '0';
            buffer = 0;
            break;

            case '←':
            if(input.innerHTML !== '0'){
                if(input.innerHTML.length === 1){
                    input.innerHTML = '0';
                }
                else{
                    let newInput = input.innerHTML.slice(0, input.innerHTML.length-1);
                    input.innerHTML = newInput;
                }
            }
            break;

            case '÷':
            if(input.innerHTML !== '0'){
                lastOperator = '/';
                performOperation(lastOperator);
                input.innerHTML = '0';
            }
            break;

            case '×':
            if(input.innerHTML !== '0'){
                lastOperator = '*';
                performOperation(lastOperator);
                input.innerHTML = '0';
            }
            break;

            case '-':
            if(input.innerHTML !== '0'){
                lastOperator = '-';
                performOperation(lastOperator);
                input.innerHTML = '0';
            }
            break;

            case '+':
            if(input.innerHTML !== '0'){
                lastOperator = '+';
                performOperation(lastOperator);
                input.innerHTML = '0';
            }
            break;

            case '=':
            if(input.innerHTML !== '0'){
                lastOperator = '=';
                buffer = eval(bufferDisplay.innerHTML+ input.innerHTML);
                input.innerHTML = buffer;
                bufferDisplay.innerHTML = '';
            }
            break;

            case '.':
            if(input.innerHTML !== '0'){
                if(!input.innerHTML.includes('.')){
                    input.innerHTML += value;
                }
            }
            break;
        }
}

const handleNumbers = function(value){
    if(lastOperator === '=' || input.innerHTML === '0'){
        input.innerHTML = value;
        lastOperator = '';
    }
    else{
        input.innerHTML += value;
    }
}

const performOperation = function(value){
    
        if(bufferDisplay.innerHTML === ""){
            buffer = parseFloat(input.innerHTML);
            bufferDisplay.innerHTML = buffer +' '+value;
        }
        else{
            if(input.innerHTML === '0'){
                let bufferDisplayArray =bufferDisplay.innerHTML.split('');
                bufferDisplayArray[bufferDisplayArray.length-1] = value;
                bufferDisplay.innerHTML = bufferDisplayArray.join('');
            }
            else{
                buffer = eval(bufferDisplay.innerHTML+ input.innerHTML);
                bufferDisplay.innerHTML = buffer +' '+value;
            }
        }
        input.innerHTML = '0';
}
buttons.addEventListener('click', function(){
    handleClick(event.target.innerHTML);
});
