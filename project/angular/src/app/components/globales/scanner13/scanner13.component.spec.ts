import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Scanner13Component } from './scanner13.component';

describe('Scanner13Component', () => {
  let component: Scanner13Component;
  let fixture: ComponentFixture<Scanner13Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Scanner13Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Scanner13Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
