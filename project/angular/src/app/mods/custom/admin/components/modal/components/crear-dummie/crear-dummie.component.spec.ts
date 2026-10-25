import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearDummieComponent } from './crear-dummie.component';

describe('CrearDummieComponent', () => {
  let component: CrearDummieComponent;
  let fixture: ComponentFixture<CrearDummieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CrearDummieComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearDummieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
