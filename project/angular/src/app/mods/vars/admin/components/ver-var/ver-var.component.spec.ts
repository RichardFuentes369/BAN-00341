import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerVarComponent } from './ver-var.component';

describe('VerVarComponent', () => {
  let component: VerVarComponent;
  let fixture: ComponentFixture<VerVarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VerVarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerVarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
