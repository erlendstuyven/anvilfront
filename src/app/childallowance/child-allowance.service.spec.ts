/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ChildAllowanceService } from './child-allowance.service';
import {Http, BaseRequestOptions, ConnectionBackend, RequestMethod, Response, ResponseOptions} from "@angular/http";
import {MockBackend} from "@angular/http/testing";
import {ChildAllowance} from "./childallowance";
import {ChildAllowances} from "./childallowances";

describe('ChildAllowanceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: Http, useFactory: (backend: ConnectionBackend, defaultOptions: BaseRequestOptions) => {
          return new Http(backend, defaultOptions); }, deps: [MockBackend, BaseRequestOptions] },
        { provide: BaseRequestOptions, useClass: BaseRequestOptions },
        { provide: MockBackend, useClass: MockBackend },
        { provide: ChildAllowanceService, useClass: ChildAllowanceService }
      ]
    });
  });

  it('should initialize', inject([ChildAllowanceService], (service: ChildAllowanceService) => {
    expect(service).toBeTruthy();
  }));

  it('should perform a http get call to api/calculation and should return a list of ChildAllowances', (done) => {
    inject([MockBackend, ChildAllowanceService], (mockBackend: MockBackend, service: ChildAllowanceService) => {
      let childAllowances: ChildAllowances = new ChildAllowances();
      childAllowances.calculations = [ new ChildAllowance("160.00", '1234'), new ChildAllowance("150.00", '1111') ];

      mockBackend.connections.subscribe((connection) => {
        let request = connection.request;

        expect(request.url).toEqual('api/calculation');
        expect(request.method).toEqual(RequestMethod.Post);

        connection.mockRespond(new Response(new ResponseOptions({
          status: 200,
          body: JSON.stringify(childAllowances)
        })));
      });

      service
        .getChildAllowance()
        .subscribe(actualCreateChildFileResponse => {
          expect(actualCreateChildFileResponse).toEqual(childAllowances);
          done();
        });
    })();
  });

});
