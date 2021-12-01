import { Directive, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[openDropdown]',
})
export class OpenDropdownDirective {
  @Input() dropdown = '';
  constructor() {}
  @HostListener('click')
  onClick() {
    const targetElement = document.querySelector(this.dropdown);
    targetElement?.classList.toggle('active');
  }
}
