import { ComponentFixture, async, TestBed, inject } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { CalculationComponent } from './calculation.component';
import { CalculationService } from "./calculation.service";
import { CalculationServiceMock } from "./calculation.service.mock";
import { Calculation } from "./calculation";
import {Allowance} from "./allowance";
import {CalculationRequest} from "./calculation-request";

describe('CalculationComponent', () => {

  let component;
  let fixture: ComponentFixture<CalculationComponent>;


  var allowanceBasic: Allowance = new Allowance('BASIC', 160);
  var allowanceFosterCare: Allowance = new Allowance('FOSTERCARE', 61.79);
  let allowances: Allowance[] = [];
  allowances.push(allowanceBasic);
  allowances.push(allowanceFosterCare);
  var expectedCalculation: Calculation = new Calculation(allowances);

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

      let expectedCalculationRequest : CalculationRequest = new CalculationRequest('2019-02', []);

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
      expect(calculationService.params).toEqual(new CalculationRequest('2019-02', ['BASIC']));
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
      expect(calculationService.params).toEqual(new CalculationRequest('2019-02', ['BASIC', 'FOSTERCARE']));
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
      expect(calculationService.params).toEqual(new CalculationRequest('2019-02', ['FOSTERCARE']));
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
      expect(calculationService.params).toEqual(new CalculationRequest('2019-02', ['BASIC']));
    })();
  });

});
