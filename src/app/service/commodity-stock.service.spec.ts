import { TestBed } from '@angular/core/testing';

import { CommodityStockService } from './commodity-stock.service';

describe('CommodityStockService', () => {
  let service: CommodityStockService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommodityStockService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
