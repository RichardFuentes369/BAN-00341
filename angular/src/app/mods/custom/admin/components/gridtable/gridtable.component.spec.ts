import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridtableComponent } from './gridtable.component';

describe('GridtableComponent', () => {
  let component: GridtableComponent;
  let fixture: ComponentFixture<GridtableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GridtableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GridtableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
