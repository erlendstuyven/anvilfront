import { ComponentFixture, async, TestBed, inject } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ChildAllowanceComponent } from './child-allowance.component';
import { ChildAllowanceService } from "./child-allowance.service";
import { ChildAllowanceServiceMock } from "./child-allowance.service.mock";
import { ChildAllowances } from "./childallowances";
import { ChildAllowance } from "./childallowance";

describe('ChildAllowanceComponent', () => {
  let component;
  let fixture: ComponentFixture<ChildAllowanceComponent>;

  let expectedChildAllowances = new ChildAllowances();
  expectedChildAllowances.calculations = [ new ChildAllowance('160.00', '123'), new ChildAllowance('150.00', '345') ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      providers: [
        { provide: ChildAllowanceService, useFactory: () => new ChildAllowanceServiceMock() }
      ],
      declarations: [
        ChildAllowanceComponent
      ],
    });
    TestBed.compileComponents();

    fixture = TestBed.createComponent(ChildAllowanceComponent);
    component = fixture.debugElement.componentInstance;
  });

  it('should create the app', async(() => {
    expect(component).toBeTruthy();
  }));

  it('calculate should delegate to ChildAllowanceService', () => {
    inject([ChildAllowanceService], (childAllowanceService: ChildAllowanceServiceMock) => {
      component.year = 2019;
      component.month = 2;

      childAllowanceService.childAllowances = expectedChildAllowances;

      component.calculate();

      expect(component.childAllowances).toEqual(expectedChildAllowances);
      expect(childAllowanceService.params).toEqual({year:2019,month:2});
    })();
  });

});
