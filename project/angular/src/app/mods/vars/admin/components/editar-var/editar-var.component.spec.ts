import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarVarComponent } from './editar-var.component';

describe('EditarVarComponent', () => {
  let component: EditarVarComponent;
  let fixture: ComponentFixture<EditarVarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditarVarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarVarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
