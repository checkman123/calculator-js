//Get all buttons from the html
const numberButtons = document.querySelectorAll('[calc-num]');
const operationButtons = document.querySelectorAll('[calc-operation]');
const eqlButton = document.querySelector('[calc-equal]');
const deleteButton = document.querySelector('[calc-delete]');
const clearButton = document.querySelector('[calc-clear]');
const previousOperandTextElement = document.querySelector('[calc-previous-operand]');
const currentOperandTextElement = document.querySelector('[calc-current-operand]');

//Calc instance


//Event listener for each buttons
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
      calculator.appendNumber(button.innerText);
      calculator.updateDisplay();
      console.log("ASDASD")
    })
  })

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
      calculator.chooseOperation(button.innerText);
      calculator.updateDisplay();
    });
})

eqlButton.addEventListener('click', () => {
    calculator.calculate();
    calculator.updateDisplay();
})

deleteButton.addEventListener('click', () => {
    calculator.delete();
    calculator.updateDisplay();
})


clearButton.addEventListener('click', () => {
    calculator.clear();
    calculator.updateDisplay();
})

class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
      this.previousOperandTextElement = previousOperandTextElement;
      this.currentOperandTextElement = currentOperandTextElement;
      this.clear();
  }

    clear() {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
    }

    delete() {
    }

    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return;

        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    chooseOperation(operation) {
        if (this.currentOperand === '') return;
        if (this.previousOperand !== '') {
          this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }

    calculate() {
        let calc = 0;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if (isNaN(prev) || isNaN(current)) return;

        switch (this.operation) {
          case '+':
            calc = prev + current;
            break
          case '-':
            calc = prev - current;
            break
          case '*':
            calc = prev * current;
            break
          case '÷':
            calc = prev / current;
            break;
          default:
            return;
        }
        this.currentOperand = calc;
        this.operation = undefined;
        this.previousOperand = '';
    }

    updateDisplay() {
        this.currentOperandTextElement.innerText =
          this.getDisplayNumber(this.currentOperand)
        if (this.operation != null) {
          this.previousOperandTextElement.innerText =
            `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        } else {
          this.previousOperandTextElement.innerText = ''
        }
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)) {
          integerDisplay = ''
        } else {
          integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
        }
        if (decimalDigits != null) {
          return `${integerDisplay}.${decimalDigits}`
        } else {
          return integerDisplay
        }
    }

}

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)