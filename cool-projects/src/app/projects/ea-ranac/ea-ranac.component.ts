import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-ea-ranac',
  templateUrl: './ea-ranac.component.html',
  styleUrls: ['./ea-ranac.component.scss'],
})
export class EaRanacComponent implements OnInit {
  bagForm = new FormGroup({
    maxSize: new FormControl(9, [Validators.required, Validators.min(1)]),
    items: new FormArray([
      new FormGroup({
        name: new FormControl('biseri', [Validators.required]),
        value: new FormControl(4, [Validators.required, Validators.min(1)]),
        weight: new FormControl(3, [Validators.required, Validators.min(1)]),
      }),
      new FormGroup({
        name: new FormControl('zlato', [Validators.required]),
        value: new FormControl(7, [Validators.required, Validators.min(1)]),
        weight: new FormControl(7, [Validators.required, Validators.min(1)]),
      }),
      new FormGroup({
        name: new FormControl('kruna', [Validators.required]),
        value: new FormControl(5, [Validators.required, Validators.min(1)]),
        weight: new FormControl(4, [Validators.required, Validators.min(1)]),
      }),
      new FormGroup({
        name: new FormControl('kovanica', [Validators.required]),
        value: new FormControl(1, [Validators.required, Validators.min(1)]),
        weight: new FormControl(1, [Validators.required, Validators.min(1)]),
      }),
      new FormGroup({
        name: new FormControl('sekira', [Validators.required]),
        value: new FormControl(5, [Validators.required, Validators.min(1)]),
        weight: new FormControl(4, [Validators.required, Validators.min(1)]),
      }),
      new FormGroup({
        name: new FormControl('mac', [Validators.required]),
        value: new FormControl(4, [Validators.required, Validators.min(1)]),
        weight: new FormControl(3, [Validators.required, Validators.min(1)]),
      }),
      new FormGroup({
        name: new FormControl('prsten', [Validators.required]),
        value: new FormControl(5, [Validators.required, Validators.min(1)]),
        weight: new FormControl(2, [Validators.required, Validators.min(1)]),
      }),
      new FormGroup({
        name: new FormControl('pehar', [Validators.required]),
        value: new FormControl(1, [Validators.required, Validators.min(1)]),
        weight: new FormControl(3, [Validators.required, Validators.min(1)]),
      }),
    ]),
  });
  constructor() {}
  get items() {
    return this.bagForm.get('items') as FormArray;
  }
  ngOnInit(): void {}
  addItem() {
    this.items.push(
      new FormGroup({
        name: new FormControl('predmet', [Validators.required]),
        value: new FormControl(1, [Validators.required, Validators.min(1)]),
        weight: new FormControl(1, [Validators.required, Validators.min(1)]),
      })
    );
  }
  removeItemAtIndex(index: number) {
    this.items.removeAt(index);
  }
  // TODO Gubise fokus zato sto se menja vrendost i opet se pravi forma
  onSubmit() {
    console.log(this.bagForm.valid);
    console.log(this.bagForm.value);
  }
}
