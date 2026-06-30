import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearVarComponent } from './crear-var.component';

describe('CrearVarComponent', () => {
  let component: CrearVarComponent;
  let fixture: ComponentFixture<CrearVarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CrearVarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearVarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
