import { TestBed } from '@angular/core/testing';

import { AuthapartamentoService } from './authapartamento.service';

describe('AuthapartamentoService', () => {
  let service: AuthapartamentoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthapartamentoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
