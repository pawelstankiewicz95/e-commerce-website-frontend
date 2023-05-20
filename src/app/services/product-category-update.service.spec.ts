import { TestBed } from '@angular/core/testing';

import { ProductCategoryUpdateServiceService } from './product-category-update.service';

describe('ProductCategoryUpdateServiceService', () => {
  let service: ProductCategoryUpdateServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductCategoryUpdateServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
