import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroRegistroComponent } from './filtro.component';

describe('FiltroRegistroComponent', () => {
  let component: FiltroRegistroComponent;
  let fixture: ComponentFixture<FiltroRegistroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FiltroRegistroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FiltroRegistroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
