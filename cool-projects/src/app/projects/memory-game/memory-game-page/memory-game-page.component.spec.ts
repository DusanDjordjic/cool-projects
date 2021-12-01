import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemoryGamePageComponent } from './memory-game-page.component';

describe('MemoryGamePageComponent', () => {
  let component: MemoryGamePageComponent;
  let fixture: ComponentFixture<MemoryGamePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemoryGamePageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MemoryGamePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
