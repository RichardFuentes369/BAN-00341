import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerWarehouseComponent } from './ver-warehouse.component';

describe('VerWarehouseComponent', () => {
  let component: VerWarehouseComponent;
  let fixture: ComponentFixture<VerWarehouseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VerWarehouseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerWarehouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
