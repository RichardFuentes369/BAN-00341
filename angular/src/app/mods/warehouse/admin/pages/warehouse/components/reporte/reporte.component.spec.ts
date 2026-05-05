import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteWarehouseComponent } from './reporte.component';

describe('ReporteWarehouseComponent', () => {
  let component: ReporteWarehouseComponent;
  let fixture: ComponentFixture<ReporteWarehouseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReporteWarehouseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReporteWarehouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
