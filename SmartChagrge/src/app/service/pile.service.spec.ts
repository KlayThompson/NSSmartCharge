import { TestBed } from '@angular/core/testing';

import { PileService } from './pile.service';

describe('PileService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PileService = TestBed.get(PileService);
    expect(service).toBeTruthy();
  });
});
