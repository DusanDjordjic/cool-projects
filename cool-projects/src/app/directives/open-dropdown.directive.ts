import { Directive, HostListener, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Directive({
  selector: '[openDropdown]',
})
export class OpenDropdownDirective implements OnInit {
  @Input() dropdown = '';
  constructor(private route: ActivatedRoute) {}
  @HostListener('click')
  onClick() {
    const targetElement = document.querySelector(this.dropdown);
    targetElement?.classList.toggle('active');
  }
  ngOnInit() {
    this.route.params.subscribe((data) => {
      console.log('a');
    });
  }
}
