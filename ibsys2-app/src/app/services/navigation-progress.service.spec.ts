import { TestBed } from '@angular/core/testing';

import { NavigationProgressService } from './navigation-progress.service';

describe('NavigationProgressService', () => {
  let service: NavigationProgressService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NavigationProgressService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
