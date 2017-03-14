/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CalculationService } from './calculation.service';
import {
  Http, BaseRequestOptions, ConnectionBackend, RequestMethod, Response, ResponseOptions,
  RequestOptions, Headers
} from "@angular/http";
import {MockBackend} from "@angular/http/testing";
import {Calculation} from "./calculation";
import {Allowance} from "./allowance";
import {CalculationRequest} from "./calculation-request";

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

  it('should perform a http post call to api/calculation and should return a list of allowances', (done) => {
    inject([MockBackend, CalculationService], (mockBackend: MockBackend, service: CalculationService) => {

      let entitlements: string[] = [];
      entitlements.push('BASIC');

      var allowance: Allowance = new Allowance('BASIC', 160);
      let allowances: Allowance[] = [];
      allowances.push(allowance);

      let calculation: Calculation = new Calculation(allowances);
      let calculationRequest: CalculationRequest = new CalculationRequest('2019-02', entitlements);

      mockBackend.connections.subscribe((connection) => {
        let request = connection.request;

        expect(request.url).toEqual('api/calculation');
        expect(request.method).toEqual(RequestMethod.Post);

        connection.mockRespond(new Response(new ResponseOptions({
          status: 200,
          body: JSON.stringify(calculation),
        })));
      });

      service
        .getCalculation(calculationRequest)
        .subscribe(actualCalculationResponse => {
          expect(actualCalculationResponse).toEqual(calculation);
          done();
        });
    })();
  });

});
