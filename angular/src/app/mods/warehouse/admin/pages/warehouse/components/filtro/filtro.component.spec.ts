import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroWarehouseComponent } from './filtro.component';

describe('FiltroWarehouseComponent', () => {
  let component: FiltroWarehouseComponent;
  let fixture: ComponentFixture<FiltroWarehouseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FiltroWarehouseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FiltroWarehouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
