import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Item } from './models/item.model';
import { Population } from './models/population.model';
const defaultItems = [
  new Item({
    name: 'biseri',
    value: 4,
    weight: 3,
    maxCount: 1,
  }),
  new Item({
    name: 'zlato',
    value: 7,
    weight: 7,
    maxCount: 1,
  }),
  new Item({
    name: 'kruna',
    value: 5,
    weight: 4,
    maxCount: 1,
  }),
  new Item({
    name: 'kovanica',
    value: 1,
    weight: 1,
    maxCount: 1,
  }),
  new Item({
    name: 'sekira',
    value: 5,
    weight: 4,
    maxCount: 1,
  }),
  new Item({
    name: 'mac',
    value: 4,
    weight: 3,
    maxCount: 1,
  }),
  new Item({
    name: 'prsten',
    value: 5,
    weight: 2,
    maxCount: 1,
  }),
  new Item({
    name: 'pehar',
    value: 1,
    weight: 3,
    maxCount: 1,
  }),
];
@Component({
  selector: 'app-ea-ranac',
  templateUrl: './ea-ranac.component.html',
  styleUrls: ['./ea-ranac.component.scss'],
})
export class EaRanacComponent implements OnInit {
  bagForm = new FormGroup({
    maxSize: new FormControl(9, [Validators.required, Validators.min(1)]),
    items: new FormArray([]),
  });
  population!: Population;
  constructor() {}
  get items() {
    return this.bagForm.get('items') as FormArray;
  }
  ngOnInit(): void {
    defaultItems.forEach((item) => {
      this.addItem(item);
    });
  }
  addItem(item?: Item) {
    this.items.push(
      new FormGroup({
        name: new FormControl((item && item.name) || 'predmet', [
          Validators.required,
        ]),
        value: new FormControl((item && item.value) || 1, [
          Validators.required,
          Validators.min(1),
        ]),
        weight: new FormControl((item && item.weight) || 1, [
          Validators.required,
          Validators.min(1),
        ]),

        maxCount: new FormControl((item && item.maxCount) || 1, [
          Validators.required,
          Validators.min(1),
        ]),
      })
    );
  }
  removeItemAtIndex(index: number) {
    this.items.removeAt(index);
  }

  onSubmit() {
    this.population = new Population(
      this.items.value,
      this.items.value.length,
      +this.bagForm.value.maxSize
    );
  }
  getItemFromGroupByIndex(index: number) {
    return this.items.get(`${index}`) as FormGroup;
  }
}
