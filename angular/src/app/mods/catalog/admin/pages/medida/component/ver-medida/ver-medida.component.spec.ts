import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerMedidaComponent } from './ver-medida.component';

describe('VerMedidaComponent', () => {
  let component: VerMedidaComponent;
  let fixture: ComponentFixture<VerMedidaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VerMedidaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerMedidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
