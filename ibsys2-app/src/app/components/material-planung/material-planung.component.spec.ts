import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialPlanungComponent } from './material-planung.component';

describe('MaterialPlanungComponent', () => {
  let component: MaterialPlanungComponent;
  let fixture: ComponentFixture<MaterialPlanungComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MaterialPlanungComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaterialPlanungComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
