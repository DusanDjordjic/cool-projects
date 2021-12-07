import { Directive, HostListener, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[openDropdown]',
})
export class OpenDropdownDirective implements OnInit {
  timeout!: NodeJS.Timeout;
  @Input() dropdown = '';
  constructor() {}
  @HostListener('mouseenter')
  onEnter() {
    const targetElement = document.querySelector(this.dropdown);
    targetElement?.classList.add('active');
    clearTimeout(this.timeout);
  }
  @HostListener('mouseleave')
  onLeave(event: any) {
    console.log('leave');
    this.timeout = setTimeout(() => {
      const targetElement = document.querySelector(this.dropdown);
      targetElement?.classList.remove('active');
    }, 250);
  }
  ngOnInit() {}
}
