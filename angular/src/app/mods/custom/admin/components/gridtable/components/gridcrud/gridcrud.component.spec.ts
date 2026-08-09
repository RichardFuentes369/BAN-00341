import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridcrudComponent } from './gridcrud.component';

describe('GridcrudComponent', () => {
  let component: GridcrudComponent;
  let fixture: ComponentFixture<GridcrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GridcrudComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GridcrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
