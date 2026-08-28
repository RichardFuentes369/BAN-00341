import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RangosComponent } from './rangos.component';

describe('RangosComponent', () => {
  let component: RangosComponent;
  let fixture: ComponentFixture<RangosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RangosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RangosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
