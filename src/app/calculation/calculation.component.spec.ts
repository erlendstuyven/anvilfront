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
      expect(calculationService.params).toEqual(new CalculationRequest(2019, 2, [new Entitlement('BASIC', 'cat1')]));
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
      expect(calculationService.params).toEqual(new CalculationRequest(2019, 2, [new Entitlement('BASIC', 'cat1'), new Entitlement('CARE_FOSTER', 'cat1')]));
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
      expect(calculationService.params).toEqual(new CalculationRequest(2019, 2, [new Entitlement('CARE_FOSTER', 'cat1')]));
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
      expect(calculationService.params).toEqual(new CalculationRequest(2019, 2, [new Entitlement('BASIC', 'cat1')]));
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
      expect(calculationService.params).toEqual(new CalculationRequest(2019, 2, [new Entitlement('BASIC', 'cat1'), new Entitlement('CARE_ORPHAN', 'cat1')]));
    })();
  });

  it('calculate should delegate to CalculationService when BasicAllowanceGranted is checked and Social is checked', () => {
    inject([CalculationService], (calculationService: CalculationServiceMock) => {
      component.year = 2019;
      component.month = 2;
      component.isBasicAllowanceGranted = true;
      component.isFosterCareAllowanceGranted = false;
      component.isSocialAllowanceGranted = 'cat1';

      calculationService.calculation = expectedCalculation;

      component.calculate();

      expect(component.calculation).toEqual(expectedCalculation);
      expect(calculationService.params).toEqual(new CalculationRequest(2019, 2, [new Entitlement('BASIC', 'cat1'), new Entitlement('SOCIAL', 'cat1')]));
    })();
  });

  it('calculate should delegate to CalculationService when UniversalParticipationCareGranted is checked', () => {
    inject([CalculationService], (calculationService: CalculationServiceMock) => {
      component.year = 2019;
      component.month = 2;
      component.isBasicAllowanceGranted = false;
      component.isFosterCareAllowanceGranted = false;
      component.isSocialAllowanceGranted = false;
      component.isUniversalParticipationGranted = 'cat1';

      calculationService.calculation = expectedCalculation;

      component.calculate();

      expect(component.calculation).toEqual(expectedCalculation);
      expect(calculationService.params).toEqual(new CalculationRequest(2019, 2, [new Entitlement('PARTICIPATION_UNIVERSAL', 'cat1')]));
    })();
  });

  it('calculate should delegate to CalculationService when DayCareDaysGranted is checked', () => {
    inject([CalculationService], (calculationService: CalculationServiceMock) => {
      component.year = 2019;
      component.month = 2;
      component.isBasicAllowanceGranted = false;
      component.isFosterCareAllowanceGranted = false;
      component.isSocialAllowanceGranted = false;
      component.isUniversalParticipationGranted = '';
      component.isDayCareAllowanceGranted = true;
      component.dayCareDays = 20;

      calculationService.calculation = expectedCalculation;

      component.calculate();

      expect(component.calculation).toEqual(expectedCalculation);
      expect(calculationService.params).toEqual(new CalculationRequest(2019, 2, [new Entitlement('DAY_CARE', 'cat1', 20)]));
    })();
  });

});
