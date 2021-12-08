export class Item {
  value: number;
  name: string;
  weight: number;
  maxCount: number;
  constructor(obj?: any) {
    this.value = (obj && obj.value) || 0;
    this.maxCount = (obj && obj.maxCount) || 0;
    this.weight = (obj && obj.weight) || 0;
    this.name = (obj && obj.name) || '';
  }
}
export class Items {
  items: Item[];
  constructor(obj?: any) {
    this.items = (obj && obj.map((item: any) => new Item(item))) || [];
  }
}
