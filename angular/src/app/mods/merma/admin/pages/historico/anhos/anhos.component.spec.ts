import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnhosComponent } from './anhos.component';

describe('AnhosComponent', () => {
  let component: AnhosComponent;
  let fixture: ComponentFixture<AnhosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AnhosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnhosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
