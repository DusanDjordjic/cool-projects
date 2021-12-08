import { Item } from './item.model';

export class Bag {
  maxWeight: number;
  private items: Item[];
  constructor(maxWeight: number) {
    this.maxWeight = maxWeight;
    this.items = [];
  }
  addItem(newItem: Item) {
    this.items.push(newItem);
  }
  calculateFitness() {
    let value = 0;
    let weight = 0;
    for (let i = 0; i < this.items.length; i++) {
      value += this.items[i].value;
      weight += this.items[i].weight;
    }
    if (weight > this.maxWeight) value = 0;
    console.log('value: ', value);
    console.log('weight: ', weight);

    return value;
  }
  clear() {
    this.items = [];
  }
}
