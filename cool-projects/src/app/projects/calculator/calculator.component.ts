import { Component, OnInit } from '@angular/core';
import { Calculator } from './models/calculator.model';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss'],
})
export class CalculatorComponent implements OnInit {
  calculator: Calculator = new Calculator();

  constructor() {}

  ngOnInit(): void {}

  addNumber(number: number | string) {
    this.calculator.appendNumber(number);
  }
  delete() {
    this.calculator.delete();
  }
  clear() {
    this.calculator.clear();
  }
  chooseOperation(opertaion: string) {
    this.calculator.chooseOperation(opertaion);
  }
  compute() {
    this.calculator.compute();
  }
}
