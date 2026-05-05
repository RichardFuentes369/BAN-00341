import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarehoseComponent } from './warehouse.component';

describe('WarehoseComponent', () => {
  let component: WarehoseComponent;
  let fixture: ComponentFixture<WarehoseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WarehoseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WarehoseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
