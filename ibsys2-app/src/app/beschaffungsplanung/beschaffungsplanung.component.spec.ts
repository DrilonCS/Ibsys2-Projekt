import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeschaffungsplanungComponent } from './beschaffungsplanung.component';

describe('BeschaffungsplanungComponent', () => {
  let component: BeschaffungsplanungComponent;
  let fixture: ComponentFixture<BeschaffungsplanungComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BeschaffungsplanungComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BeschaffungsplanungComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
