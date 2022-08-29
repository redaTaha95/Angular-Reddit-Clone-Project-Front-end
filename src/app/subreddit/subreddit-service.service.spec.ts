import { TestBed } from '@angular/core/testing';

import { SubredditServiceService } from './subreddit-service.service';

describe('SubredditServiceService', () => {
  let service: SubredditServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubredditServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
