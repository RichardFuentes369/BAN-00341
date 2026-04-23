import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearMedidaComponent } from './crear-medida.component';

describe('CrearMedidaComponent', () => {
  let component: CrearMedidaComponent;
  let fixture: ComponentFixture<CrearMedidaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CrearMedidaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearMedidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
