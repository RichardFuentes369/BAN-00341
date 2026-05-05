import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarWarehouseComponent } from './editar-warehouse.component';

describe('EditarWarehouseComponent', () => {
  let component: EditarWarehouseComponent;
  let fixture: ComponentFixture<EditarWarehouseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditarWarehouseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarWarehouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
