import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerRegistroComponent } from './ver-registro.component';

describe('VerRegistroComponent', () => {
  let component: VerRegistroComponent;
  let fixture: ComponentFixture<VerRegistroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VerRegistroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerRegistroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
