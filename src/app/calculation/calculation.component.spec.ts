import { ComponentFixture, async, TestBed, inject } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { CalculationComponent } from './calculation.component';
import { CalculationService } from "./calculation.service";
import { CalculationServiceMock } from "./calculation.service.mock";
import { Calculation } from "./calculation";
import {Allowance} from "./allowance";
import {CalculationRequest} from "./calculation-request";
import {Entitlement} from "./entitlement";
import {Category} from "./category";
import {All} from "tslint/lib/rules/completedDocsRule";
import {Social} from "./social";
import {DayCare} from "./daycare";

describe('CalculationComponent', () => {

  let component;
  let fixture: ComponentFixture<CalculationComponent>;
  let expectedCalculation: Calculation = new Calculation(2019, 2, 'timestamp', [], 301.79);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      providers: [
        { provide: CalculationService, useFactory: () => new CalculationServiceMock() }
      ],
      declarations: [
        CalculationComponent
      ],
    });
    TestBed.compileComponents();

    fixture = TestBed.createComponent(CalculationComponent);
    component = fixture.debugElement.componentInstance;
  });

  it('should create the app', async(() => {
    expect(component).toBeTruthy();
  }));

  it('calculate should delegate to CalculationService with BasicAllowanceGranted unchecked', () => {
    inject([CalculationService], (calculationService: CalculationServiceMock) => {
      component.year = 2019;
      component.month = 2;
      component.isBasicAllowanceGranted = false;

      calculationService.calculation = expectedCalculation;

      let expectedCalculationRequest : CalculationRequest = new CalculationRequest(2019, 2, []);

      component.calculate();

      expect(component.calculation).toEqual(expectedCalculation);
      expect(calculationService.params).toEqual(expectedCalculationRequest);
    })();
  });

  it('calculate should delegate to CalculationService when BasicAllowanceGranted is checked', () => {
    inject([CalculationService], (calculationService: CalculationServiceMock) => {
      component.year = 2019;
      component.month = 2;
      component.isBasicAllowanceGranted = true;

      calculationService.calculation = expectedCalculation;

      component.calculate();

      expect(component.calculation).toEqual(expectedCalculation);
      expect(calculationService.params).toEqual(new CalculationRequest(2019, 2, [new Entitlement('BASIS', 'cat1')]));
    })();
  });

  it('calculate should delegate to CalculationService when BasicAllowanceGranted and FosterCareAllowanceGranted is checked', () => {
    inject([CalculationService], (calculationService: CalculationServiceMock) => {
      component.year = 2019;
      component.month = 2;
      component.isBasicAllowanceGranted = true;
      component.isFosterCareAllowanceGranted = true;

      calculationService.calculation = expectedCalculation;

      component.calculate();

      expect(component.calculation).toEqual(expectedCalculation);
      expect(calculationService.params).toEqual(new CalculationRequest(2019, 2, [new Entitlement('BASIS', 'cat1'), new Entitlement('ZORG_PLEEG', 'cat1')]));
    })();
  });

  it('calculate should delegate to CalculationService when FosterCareAllowanceGranted is checked but  BasicAllowanceGranted is unchecked', () => {
    inject([CalculationService], (calculationService: CalculationServiceMock) => {
      component.year = 2019;
      component.month = 2;
      component.isBasicAllowanceGranted = false;
      component.isFosterCareAllowanceGranted = true;

      calculationService.calculation = expectedCalculation;

      component.calculate();

      expect(component.calculation).toEqual(expectedCalculation);
      expect(calculationService.params).toEqual(new CalculationRequest(2019, 2, [new Entitlement('ZORG_PLEEG', 'cat1')]));
    })();
  });

  it('calculate should delegate to CalculationService when BasicAllowanceGranted is checked but FosterCareAllowanceGranted is unchecked', () => {
    inject([CalculationService], (calculationService: CalculationServiceMock) => {
      component.year = 2019;
      component.month = 2;
      component.isBasicAllowanceGranted = true;
      component.isFosterCareAllowanceGranted = false;

      calculationService.calculation = expectedCalculation;

      component.calculate();

      expect(component.calculation).toEqual(expectedCalculation);
      expect(calculationService.params).toEqual(new CalculationRequest(2019, 2, [new Entitlement('BASIS', 'cat1')]));
    })();
  });

  it('calculate should delegate to CalculationService when BasicAllowanceGranted is checked and Orphancare half wees is checked', () => {
    inject([CalculationService], (calculationService: CalculationServiceMock) => {
      component.year = 2019;
      component.month = 2;
      component.isBasicAllowanceGranted = true;
      component.isFosterCareAllowanceGranted = false;
      component.isOrphanCareAllowanceGranted = 'cat1';

      calculationService.calculation = expectedCalculation;

      component.calculate();

      expect(component.calculation).toEqual(expectedCalculation);
      expect(calculationService.params).toEqual(new CalculationRequest(2019, 2, [new Entitlement('BASIS', 'cat1'), new Entitlement('ZORG_WEES', 'cat1')]));
    })();
  });

  it('calculate should delegate to CalculationService when BasicAllowanceGranted is checked and Social is checked', () => {
    inject([CalculationService], (calculationService: CalculationServiceMock) => {
      component.year = 2019;
      component.month = 2;
      component.isBasicAllowanceGranted = true;
      component.isFosterCareAllowanceGranted = false;
      component.isSocialAllowanceGrantedFamilyOne = 'cat1';
      component.housingShareFamilyOne = 100;
      component.beneficiaryFamilyOne = 'thomas';

      calculationService.calculation = expectedCalculation;

      component.calculate();

      expect(component.calculation).toEqual(expectedCalculation);
      expect(calculationService.params).toEqual(new CalculationRequest(2019, 2, [new Entitlement('BASIS', 'cat1'), new Social('SOCIAAL', 'cat1', 100, 'thomas')]));
    })();
  });

  it('calculate should delegate to CalculationService when UniversalParticipationCareGranted is checked', () => {
    inject([CalculationService], (calculationService: CalculationServiceMock) => {
      component.year = 2019;
      component.month = 2;
      component.isBasicAllowanceGranted = false;
      component.isFosterCareAllowanceGranted = false;
      component.isSocialAllowanceGrantedFamilyOne = false;
      component.isUniversalParticipationGranted = 'cat1';

      calculationService.calculation = expectedCalculation;

      component.calculate();

      expect(component.calculation).toEqual(expectedCalculation);
      expect(calculationService.params).toEqual(new CalculationRequest(2019, 2, [new Entitlement('PARTICIPATIE_UNIVERSEEL', 'cat1')]));
    })();
  });

  it('calculate should delegate to CalculationService when DayCareDaysGranted is checked', () => {
    inject([CalculationService], (calculationService: CalculationServiceMock) => {
      component.year = 2019;
      component.month = 2;
      component.isBasicAllowanceGranted = false;
      component.isFosterCareAllowanceGranted = false;
      component.isSocialAllowanceGrantedFamilyOne = false;
      component.isUniversalParticipationGranted = '';
      component.isDayCareAllowanceGranted = true;
      component.dayCareDays = 20;

      calculationService.calculation = expectedCalculation;

      component.calculate();

      expect(component.calculation).toEqual(expectedCalculation);
      expect(calculationService.params).toEqual(new CalculationRequest(2019, 2, [new DayCare('KINDEROPVANG', 'cat1', 20)]));
    })();
  });

  it('calculate should delegate to CalculationService when KleuterToeslagGranted is checked', () => {
    inject([CalculationService], (calculationService: CalculationServiceMock) => {
      component.year = 2019;
      component.month = 2;
      component.isBasicAllowanceGranted = false;
      component.isFosterCareAllowanceGranted = false;
      component.isSocialAllowanceGrantedFamilyOne = false;
      component.isUniversalParticipationGranted = '';
      component.isDayCareAllowanceGranted = false;
      component.dayCareDays = 0;
      component.isKleuterToeslagGranted = 'cat1';

      calculationService.calculation = expectedCalculation;

      component.calculate();

      expect(component.calculation).toEqual(expectedCalculation);
      expect(calculationService.params).toEqual(new CalculationRequest(2019, 2, [new Entitlement('KLEUTER', 'cat1')]));
    })();
  });

  it('calculate should delegate to CalculationService when two families receive Social Allowance', () => {
    inject([CalculationService], (calculationService: CalculationServiceMock) => {
      component.year = 2019;
      component.month = 2;
      component.isBasicAllowanceGranted = false;
      component.isFosterCareAllowanceGranted = false;
      component.isSocialAllowanceGrantedFamilyOne = 'cat1';
      component.housingShareFamilyOne = 50;
      component.beneficiaryFamilyOne = 'thomas';
      component.isSocialAllowanceGrantedFamilyTwo = 'cat2';
      component.housingShareFamilyTwo = 50;
      component.beneficiaryFamilyTwo = 'stefan';

      calculationService.calculation = expectedCalculation;

      component.calculate();

      expect(component.calculation).toEqual(expectedCalculation);
      expect(calculationService.params).toEqual(new CalculationRequest(2019, 2, [new Social('SOCIAAL', 'cat1', 50, 'thomas'), new Social('SOCIAAL', 'cat2', 50, 'stefan')]));
    })();
  });

});
