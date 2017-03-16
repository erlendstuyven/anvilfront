import {browser, element, by, ElementFinder} from 'protractor';
import {Calculation} from "../../src/app/calculation/calculation";
import {Allowance} from "../../src/app/calculation/allowance";

export class CalculationPage {

  private calculateButton = element(by.id('calculateButton'));
  private yearInput = element(by.id('year'));
  private monthInput = element(by.id('month'));
  private _isBasicAllowanceGranted = element(by.id('_isBasicAllowanceGranted'));
  private _isFosterCareAllowanceGranted = element(by.id('_isFosterCareAllowanceGranted'));

  navigateTo() {
    return browser.get('/');
  }

  setYear = (year: number): void => {
    this.yearInput.sendKeys(year);
  };

  setMonth = (month: number): void => {
    this.monthInput.sendKeys(month);
  };

  calculate = (): void => {
    this.calculateButton.click();
  };

  getCalculation(index) {
    return element(by.id('calculation?.allowances' + index)).getText();
  }

  get isFosterCareAllowanceGranted(): ElementFinder {
    return this._isFosterCareAllowanceGranted;
  }
  get isBasicAllowanceGranted(): ElementFinder {
    return this._isBasicAllowanceGranted;
  }

}
