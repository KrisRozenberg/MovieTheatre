import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { moviesResolver } from './movies.resolver';

describe('moviesResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => moviesResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
