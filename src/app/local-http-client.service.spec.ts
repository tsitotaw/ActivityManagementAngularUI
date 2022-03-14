import { TestBed } from '@angular/core/testing';

import { LocalHttpClientService } from './local-http-client.service';

describe('LocalHttpClientService', () => {
  let service: LocalHttpClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalHttpClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
