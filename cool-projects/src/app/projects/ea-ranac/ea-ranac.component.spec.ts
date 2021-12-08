import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EaRanacComponent } from './ea-ranac.component';

describe('EaRanacComponent', () => {
  let component: EaRanacComponent;
  let fixture: ComponentFixture<EaRanacComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EaRanacComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EaRanacComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
