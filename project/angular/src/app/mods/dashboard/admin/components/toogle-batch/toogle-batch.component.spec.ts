import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToogleBatchComponent } from './toogle-batch.component';

describe('ToogleBatchComponent', () => {
  let component: ToogleBatchComponent;
  let fixture: ComponentFixture<ToogleBatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ToogleBatchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToogleBatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
