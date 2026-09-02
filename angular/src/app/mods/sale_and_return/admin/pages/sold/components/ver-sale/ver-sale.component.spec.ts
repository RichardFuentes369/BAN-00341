import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerSaleComponent } from './ver-sale.component';

describe('VerSaleComponent', () => {
  let component: VerSaleComponent;
  let fixture: ComponentFixture<VerSaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VerSaleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerSaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
