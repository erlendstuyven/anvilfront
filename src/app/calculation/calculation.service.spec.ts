/* tslint:disable:no-unused-variable */

import {TestBed, async, inject} from '@angular/core/testing';
import {CalculationService} from './calculation.service';
import {
  Http, BaseRequestOptions, ConnectionBackend, RequestMethod, Response, ResponseOptions,
  RequestOptions, Headers
} from "@angular/http";
import {MockBackend} from "@angular/http/testing";
import {Calculation} from "./calculation";
import {Allowance} from "./allowance";
import {CalculationRequest} from "./calculation-request";
import {Entitlement} from "./entitlement";
import {Category} from "./category";
import {Social} from "./social";

describe('CalculationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: Http, useFactory: (backend: ConnectionBackend, defaultOptions: BaseRequestOptions) => {
          return new Http(backend, defaultOptions);
        }, deps: [MockBackend, BaseRequestOptions]
        },
        {provide: BaseRequestOptions, useClass: BaseRequestOptions},
        {provide: MockBackend, useClass: MockBackend},
        {provide: CalculationService, useClass: CalculationService}
      ]
    });
  });

  it('should initialize', inject([CalculationService], (service: CalculationService) => {
    expect(service).toBeTruthy();
  }));

  it('should perform a http post call to api/calculation and should return a list of allowances', (done) => {
    inject([MockBackend, CalculationService], (mockBackend: MockBackend, service: CalculationService) => {

      let entitlements: Entitlement[] = [];
      entitlements.push(new Entitlement('BASIC', 'cat1'));
      entitlements.push(new Entitlement('CARE_FOSTER', 'cat1'));
      entitlements.push(new Entitlement('CARE_ORPHAN', 'cat1'));
      entitlements.push(new Social('SOCIAL', 'cat1', 50, 'thomas')),
      entitlements.push(new Entitlement('PARTICIPATION_UNIVERSAL', 'cat1'));
      entitlements.push(new Entitlement('DAY_CARE', 'cat1'));
      entitlements.push(new Entitlement('KLEUTER_TOESLAG', 'cat1')),
      entitlements.push(new Entitlement('ZORG_SPECIALE_NODEN', 'cat1')),
      entitlements.push(new Entitlement('LEEFTIJD', 'cat1'));

      var allowanceBasic: Allowance = new Allowance('BASIC', 160, new Category('cat1', 'basic'));
      var allowanceFosterCare: Allowance = new Allowance('CARE_FOSTER', 61.79, new Category('cat1', 'pleeg'));
      var allowanceOrphanCare: Allowance = new Allowance('CARE_ORPHAN', 80, new Category('cat1', 'halve wees'));
      var allowanceSociaalToeslag: Allowance = new Allowance('SOCIAAL', 25, new Category('cat1', 'sociale toeslag, laag inkomen, max 2 kids'));
      var allowanceParticipationUniversalCare: Allowance = new Allowance('PARTICIPATION_UNIVERSAL', 20, new Category('cat1', '0 - 2 jaar, groeipakket'));
      var allowanceDayCare: Allowance = new Allowance('DAY_CARE', 3.17, new Category('cat1', 'Kinderopvangtoeslag, groeipakket'));
      var allowanceKleuterToeslag: Allowance = new Allowance('KLEUTER_TOESLAG', 150, new Category('cat1', 'kleutertoeslag 3 jaar'));
      var allowanceZorgSpecialeNodenToeslag: Allowance = new Allowance('ZORG_SPECIALE_NODEN', 80.75, new Category('cat1', 'zorgtoeslag spec. ond. T<6 en 1ep>=4'));
      var allowanceLeeftijdsToeslag: Allowance = new Allowance('LEEFTIJD', 31.99, new Category('cat1', 'leeftijdsbijslag ander kind 6_11'));

      let allowances: Allowance[] = [];
      allowances.push(allowanceBasic);
      allowances.push(allowanceFosterCare);
      allowances.push(allowanceOrphanCare);
      allowances.push(allowanceParticipationUniversalCare);
      allowances.push(allowanceDayCare);
      allowances.push(allowanceKleuterToeslag);
      allowances.push(allowanceSociaalToeslag);
      allowances.push(allowanceZorgSpecialeNodenToeslag);
      allowances.push(allowanceLeeftijdsToeslag);


      let calculation: Calculation = new Calculation(2, 2019, 'timestamp', allowances, 612.7);
      let calculationRequest: CalculationRequest = new CalculationRequest(2019, 2, entitlements);

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
