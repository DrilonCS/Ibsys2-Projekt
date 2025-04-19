import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XMLUploadComponent } from './xmlupload.component';

describe('XMLUploadComponent', () => {
  let component: XMLUploadComponent;
  let fixture: ComponentFixture<XMLUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [XMLUploadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(XMLUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
