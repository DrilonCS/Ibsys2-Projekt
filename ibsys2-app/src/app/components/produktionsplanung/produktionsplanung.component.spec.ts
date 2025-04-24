import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProduktionsplanungComponent } from './produktionsplanung.component';

describe('ProduktionsplanungComponent', () => {
  let component: ProduktionsplanungComponent;
  let fixture: ComponentFixture<ProduktionsplanungComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProduktionsplanungComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProduktionsplanungComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
