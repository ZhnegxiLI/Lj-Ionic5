import { TestBed } from '@angular/core/testing';

import { IsLoginedGuard } from './is-logined.guard';

describe('IsLoginedGuard', () => {
  let guard: IsLoginedGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(IsLoginedGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
