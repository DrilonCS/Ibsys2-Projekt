import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KapazitaetsplanungComponent } from './kapazitaetsplanung.component';

describe('KapazitaetsplanungComponent', () => {
  let component: KapazitaetsplanungComponent;
  let fixture: ComponentFixture<KapazitaetsplanungComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [KapazitaetsplanungComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KapazitaetsplanungComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
