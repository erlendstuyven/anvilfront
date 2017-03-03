import { ComponentFixture, async, TestBed, inject } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { CalculationComponent } from './calculation.component';
import { CalculationService } from "./calculation.service";
import { CalculationServiceMock } from "./calculation.service.mock";
import { Calculations } from "./calculations";
import { Calculation } from "./calculation";

describe('CalculationComponent', () => {
  let component;
  let fixture: ComponentFixture<CalculationComponent>;

  let expectedCalculations = new Calculations();
  expectedCalculations.calculations = [ new Calculation('160.00', '123', []), new Calculation('150.00', '345', []) ];

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

  it('calculate should delegate to CalculationService', () => {
    inject([CalculationService], (calculationService: CalculationServiceMock) => {
      component.year = 2019;
      component.month = 2;

      calculationService.calculations = expectedCalculations;

      component.calculate();

      expect(component.calculations).toEqual(expectedCalculations);
      expect(calculationService.params).toEqual({year:2019,month:2});
    })();
  });

});
