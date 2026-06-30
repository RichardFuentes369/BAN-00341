import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroVarComponent } from './filtro-var.component';

describe('FiltroVarComponent', () => {
  let component: FiltroVarComponent;
  let fixture: ComponentFixture<FiltroVarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FiltroVarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FiltroVarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
