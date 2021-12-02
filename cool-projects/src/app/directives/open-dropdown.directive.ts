import { Directive, HostListener, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[openDropdown]',
})
export class OpenDropdownDirective implements OnInit {
  @Input() dropdown = '';
  constructor() {}
  @HostListener('click')
  onClick() {
    const targetElement = document.querySelector(this.dropdown);
    targetElement?.classList.toggle('active');
  }
  ngOnInit() {}
}
