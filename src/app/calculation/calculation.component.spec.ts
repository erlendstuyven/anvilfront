import {async, ComponentFixture, inject, TestBed} from "@angular/core/testing";
import {FormsModule} from "@angular/forms";
import {CalculationComponent} from "./calculation.component";
import {CalculationService} from "./calculation.service";
import {CalculationServiceMock} from "./calculation.service.mock";
import {Calculation} from "./calculation";
import {CalculationRequest} from "./calculation-request";
import {Entitlement} from "./entitlement";
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
      component.regimeSelected = 'new';
      component.isBasicAllowanceGranted = '';

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
      component.regimeSelected = 'new';
      component.isBasicAllowanceGranted = 'cat1';

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
      component.regimeSelected = 'new';
      component.isBasicAllowanceGranted = 'cat1';
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
      component.regimeSelected = 'new';
      component.isBasicAllowanceGranted = '';
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
      component.regimeSelected = 'new';
      component.isBasicAllowanceGranted = 'cat1';
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
      component.regimeSelected = 'new';
      component.isBasicAllowanceGranted = 'cat1';
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
      component.regimeSelected = 'new';
      component.isBasicAllowanceGranted = 'cat1';
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
      component.regimeSelected = 'new';
      component.isBasicAllowanceGranted = '';
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
      component.regimeSelected = 'new';
      component.isBasicAllowanceGranted = '';
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
      component.regimeSelected = 'new';
      component.isBasicAllowanceGranted = '';
      component.isFosterCareAllowanceGranted = false;
      component.isSocialAllowanceGrantedFamilyOne = '';
      component.isSocialAllowanceGrantedFamilyTwo = '';
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

  it('calculate should delegate to CalculationService when ZorgToeslagNoden is checked', () => {
    inject([CalculationService], (calculationService: CalculationServiceMock) => {
      component.year = 2019;
      component.month = 2;
      component.isZorgToeslagGranted = 'cat1';

      calculationService.calculation = expectedCalculation;

      component.calculate();

      expect(component.calculation).toEqual(expectedCalculation);
      expect(calculationService.params).toEqual(new CalculationRequest(2019, 2, [new Entitlement('ZORG_SPECIALE_NODEN', 'cat1')]));
    })();
  });

  it('calculate should delegate to CalculationService when Oud Regime is selected and Recht op Basis Bedrag selected', () => {
    inject([CalculationService], (calculationService: CalculationServiceMock) => {
      component.year = 2019;
      component.month = 2;
      component.regimeSelected = 'old';
      component.isBasicAllowanceGranted = 'cat2';

      calculationService.calculation = expectedCalculation;

      component.calculate();

      expect(component.calculation).toEqual(expectedCalculation);
      expect(calculationService.params).toEqual(new CalculationRequest(2019, 2, [new Entitlement('BASIS', 'cat2')]));
    })();
  });


});
