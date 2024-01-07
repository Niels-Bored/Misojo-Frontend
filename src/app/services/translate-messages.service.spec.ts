import { TestBed } from '@angular/core/testing';

import { TranslateMessagesService } from './translate-messages.service';

describe('TranslateMessagesService', () => {
  let service: TranslateMessagesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TranslateMessagesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
