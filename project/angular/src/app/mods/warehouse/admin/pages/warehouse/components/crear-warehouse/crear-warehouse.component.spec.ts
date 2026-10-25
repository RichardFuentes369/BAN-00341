import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearWarehouseComponent } from './crear-warehouse.component';

describe('CrearWarehouseComponent', () => {
  let component: CrearWarehouseComponent;
  let fixture: ComponentFixture<CrearWarehouseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CrearWarehouseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearWarehouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
