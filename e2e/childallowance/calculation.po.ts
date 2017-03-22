import {browser, element, by, ElementFinder} from 'protractor';
export class CalculationPage {

  private calculateButton = element(by.id('calculateButton'));
  private yearInput = element(by.id('year'));
  private monthInput = element(by.id('month'));
  private _isBasicAllowanceGranted = element(by.id('isBasicAllowanceGranted'));
  private _isFosterCareAllowanceGranted = element(by.id('isFosterCareAllowanceGranted'));
  private _isOrphanCareAllowanceGranted = element(by.id('isOrphanCareAllowanceGranted'));
  private _isSocialAllowanceGranted = element(by.id('isSocialAllowanceGranted'));
  private _total = element(by.id('total'));

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

  getAllowanceValue(type) {
    return element(by.id('allowance_' + type + '_value')).getText();
  }

  get isFosterCareAllowanceGranted(): ElementFinder {
    return this._isFosterCareAllowanceGranted;
  }
  get isBasicAllowanceGranted(): ElementFinder {
    return this._isBasicAllowanceGranted;
  }

  isOrphanCareAllowanceGranted(category: string) {
    return this._isOrphanCareAllowanceGranted.sendKeys(category);
  }

  isSocialAllowanceGranted(category: string) {
    return this._isSocialAllowanceGranted.sendKeys(category);
  }

  getTotal(type)  {
    return element(by.id('calculation.' + type)).getText();
  }


}
