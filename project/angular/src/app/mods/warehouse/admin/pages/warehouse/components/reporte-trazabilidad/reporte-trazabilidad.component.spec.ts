import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteTrazabilidadComponent } from './reporte-trazabilidad.component';

describe('ReporteTrazabilidadComponent', () => {
  let component: ReporteTrazabilidadComponent;
  let fixture: ComponentFixture<ReporteTrazabilidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReporteTrazabilidadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReporteTrazabilidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
