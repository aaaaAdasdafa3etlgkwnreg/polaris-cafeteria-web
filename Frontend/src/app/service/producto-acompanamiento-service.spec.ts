import { TestBed } from '@angular/core/testing';

import { ProductoAcompanamientoService } from './producto-acompanamiento-service';

describe('ProductoAcompanamientoService', () => {
  let service: ProductoAcompanamientoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductoAcompanamientoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
