import { TestBed } from '@angular/core/testing';

import { YoutubesearchService } from './youtubesearch.service';

describe('YoutubesearchService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: YoutubesearchService = TestBed.get(YoutubesearchService);
    expect(service).toBeTruthy();
  });
});
