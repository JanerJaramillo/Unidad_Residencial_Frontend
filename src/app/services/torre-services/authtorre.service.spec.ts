import { TestBed } from '@angular/core/testing';

import { AuthtorreService } from './authtorre.service';

describe('AuthtorreService', () => {
  let service: AuthtorreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthtorreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
