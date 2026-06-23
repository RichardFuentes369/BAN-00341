import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KpicardComponent } from './kpicard.component';

describe('KpicardComponent', () => {
  let component: KpicardComponent;
  let fixture: ComponentFixture<KpicardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [KpicardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KpicardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
