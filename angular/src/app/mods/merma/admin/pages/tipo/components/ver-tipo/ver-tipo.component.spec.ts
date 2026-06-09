import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerTipoComponent } from './ver-tipo.component';

describe('VerTipoComponent', () => {
  let component: VerTipoComponent;
  let fixture: ComponentFixture<VerTipoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VerTipoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerTipoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
