/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CalculationService } from './calculation.service';
import {Http, BaseRequestOptions, ConnectionBackend, RequestMethod, Response, ResponseOptions} from "@angular/http";
import {MockBackend} from "@angular/http/testing";
import {Calculation} from "./calculation";
import {Calculations} from "./calculations";
import {Allowance} from "./allowance";

describe('CalculationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: Http, useFactory: (backend: ConnectionBackend, defaultOptions: BaseRequestOptions) => {
          return new Http(backend, defaultOptions); }, deps: [MockBackend, BaseRequestOptions] },
        { provide: BaseRequestOptions, useClass: BaseRequestOptions },
        { provide: MockBackend, useClass: MockBackend },
        { provide: CalculationService, useClass: CalculationService }
      ]
    });
  });

  it('should initialize', inject([CalculationService], (service: CalculationService) => {
    expect(service).toBeTruthy();
  }));

  it('should perform a http get call to api/calculation and should return a list of Calculations', (done) => {
    inject([MockBackend, CalculationService], (mockBackend: MockBackend, service: CalculationService) => {
      let calculations: Calculations = new Calculations();
      calculations.calculations = [ new Calculation("160.00", '1234', [new Allowance('BASIC', 160)]), new Calculation("150.00", '1111', [new Allowance('BASIC', 160)]) ];

      mockBackend.connections.subscribe((connection) => {
        let request = connection.request;

        expect(request.url).toEqual('api/calculation?year=2019&month=2');
        expect(request.method).toEqual(RequestMethod.Get);

        connection.mockRespond(new Response(new ResponseOptions({
          status: 200,
          body: JSON.stringify(calculations)
        })));
      });

      service
        .getCalculation(2019, 2)
        .subscribe(actualCreateChildFileResponse => {
          expect(actualCreateChildFileResponse).toEqual(calculations);
          done();
        });
    })();
  });

});
