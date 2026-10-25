import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroLoteComponent } from './filtro-lote.component';

describe('FiltroLoteComponent', () => {
  let component: FiltroLoteComponent;
  let fixture: ComponentFixture<FiltroLoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FiltroLoteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FiltroLoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
