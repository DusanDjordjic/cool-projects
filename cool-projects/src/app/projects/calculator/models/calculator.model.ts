export class Calculator {
  previousOperand: string = '';
  currentOperand: string = '';
  operation: string | undefined;
  constructor(previousOperand?: string, currentOperand?: string) {
    this.previousOperand = previousOperand || '';
    this.currentOperand = currentOperand || '';
    this.operation = undefined;
  }
  clear() {
    this.currentOperand = '';
    this.previousOperand = '';
    this.operation = undefined;
  }
  delete() {
    this.currentOperand = this.currentOperand.slice(0, -1);
  }
  appendNumber(number: number | string) {
    if (number === '.' && this.currentOperand.includes('.')) return;
    this.currentOperand += number.toString();
  }
  chooseOperation(operation: string) {
    switch (operation) {
      case '+':
        this.operation = '+';
        this.updatePreviousOperand();
        break;
      case '-':
        this.operation = '-';
        this.updatePreviousOperand();
        break;
      case '*':
        this.operation = '*';
        this.updatePreviousOperand();
        break;
      case '÷':
        this.operation = '÷';
        this.updatePreviousOperand();
        break;
    }
  }
  updatePreviousOperand() {
    this.previousOperand = this.currentOperand + ` ${this.operation} `;
    this.currentOperand = '';
  }
  compute() {
    if (this.previousOperand.length === 0) {
      console.log('Prev empty');
      return;
    }
    if (this.currentOperand.length === 0) {
      console.log('Curr empty');
      return;
    }
    const firstNumber: number = Number(this.previousOperand.split(' ')[0]);
    const secondNumber: number = Number(this.currentOperand);
    let result = 0;
    switch (this.operation) {
      case '+':
        result = firstNumber + secondNumber;
        break;
      case '-':
        result = firstNumber - secondNumber;
        break;
      case '*':
        result = firstNumber * secondNumber;
        break;
      case '÷':
        result = firstNumber / secondNumber;
        break;
    }
    this.currentOperand = result.toString();
    this.previousOperand = '';
  }
}
