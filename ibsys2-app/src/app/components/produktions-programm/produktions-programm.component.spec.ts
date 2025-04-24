import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProduktionsProgrammComponent } from './produktions-programm.component';

describe('ProduktionsProgrammComponent', () => {
  let component: ProduktionsProgrammComponent;
  let fixture: ComponentFixture<ProduktionsProgrammComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProduktionsProgrammComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProduktionsProgrammComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
