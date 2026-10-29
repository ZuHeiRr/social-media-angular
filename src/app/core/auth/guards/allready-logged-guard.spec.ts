import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { allreadyLoggedGuard } from './allready-logged-guard';

describe('allreadyLoggedGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => allreadyLoggedGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
