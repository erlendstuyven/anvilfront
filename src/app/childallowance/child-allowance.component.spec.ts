/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed, inject} from '@angular/core/testing';
import { ChildAllowanceComponent } from './child-allowance.component';
import {ChildAllowanceService} from "./child-allowance.service";
import {ChildAllowanceServiceMock} from "./child-allowance.service.mock";
import {ChildAllowances} from "./childallowances";
import {ChildAllowance} from "./childallowance";

describe('ChildAllowanceComponent', () => {
  let component: ChildAllowanceComponent;
  let fixture: ComponentFixture<ChildAllowanceComponent>;

  let expectedChildAllowances = new ChildAllowances();
  expectedChildAllowances.childAllowances = [ new ChildAllowance("160.00"), new ChildAllowance("150.00") ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [ { provide: ChildAllowanceService, useClass: ChildAllowanceServiceMock } ],
      declarations: [ ChildAllowanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChildAllowanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('calculate should delegate to ChildAllowanceService', inject([ChildAllowanceService], (childAllowanceService: ChildAllowanceServiceMock) => {
      childAllowanceService.childAllowances = expectedChildAllowances;

      component.calculate();

      expect(component.childAllowances).toEqual(expectedChildAllowances);
    })
  );
});
