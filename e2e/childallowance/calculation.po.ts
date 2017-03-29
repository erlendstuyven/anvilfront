import {browser, element, by, ElementFinder} from 'protractor';
export class CalculationPage {

  private calculateButton = element(by.id('calculateButton'));
  private yearInput = element(by.id('year'));
  private monthInput = element(by.id('month'));
  private dayCareDays = element(by.id('dayCareDays'));
  private _isBasicAllowanceGranted = element(by.id('isBasicAllowanceGranted'));
  private _isFosterCareAllowanceGranted = element(by.id('isFosterCareAllowanceGranted'));
  private _isOrphanCareAllowanceGranted = element(by.id('isOrphanCareAllowanceGranted'));
  private _isSocialAllowanceGrantedFamilyOne = element(by.id('isSocialAllowanceGrantedFamilyOne'));
  private _isSocialAllowanceGrantedFamilyTwo = element(by.id('isSocialAllowanceGrantedFamilyTwo'));
  private _housingShareFamilyOne = element(by.id('housingShareFamilyOne'));
  private _housingShareFamilyTwo = element(by.id('housingShareFamilyTwo'));
  private _beneficiaryFamilyOne = element(by.id('beneficiaryFamilyOne'));
  private _beneficiaryFamilyTwo = element(by.id('beneficiaryFamilyTwo'));
  private _isUniversalParticipationGranted = element(by.id('isUniversalParticipationGranted'));
  private _isDayCareAllowanceGranted = element(by.id('isDayCareAllowanceGranted'));
  private _isKleuterToeslagGranted = element(by.id('isKleuterToeslagGranted'));
  private _isZorgToeslagGranted = element(by.id('isZorgToeslagGranted'));

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

  setDayCareDays = (dayCareDays: number): void => {
    this.dayCareDays.sendKeys(dayCareDays);
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

  get isDayCareAllowanceGranted(): ElementFinder {
    return this._isDayCareAllowanceGranted;
  }

  isOrphanCareAllowanceGranted(category: string) {
    return this._isOrphanCareAllowanceGranted.sendKeys(category);
  }

  isSocialAllowanceGrantedFamilyOne(category: string) {
    return this._isSocialAllowanceGrantedFamilyOne.sendKeys(category);
  }

  isSocialAllowanceGrantedFamilyTwo(category: string) {
    return this._isSocialAllowanceGrantedFamilyTwo.sendKeys(category);
  }


  housingShareFamilyOne(share: number) {
    return this._housingShareFamilyOne.sendKeys(share);
  }

  housingShareFamilyTwo(share: number) {
    return this._housingShareFamilyTwo.sendKeys(share);
  }

  beneficiaryFamilyOne(share: string) {
    return this._beneficiaryFamilyOne.sendKeys(share);
  }

  beneficiaryFamilyTwo(share: string) {
    return this._beneficiaryFamilyTwo.sendKeys(share);
  }

  isUniversalParticipationGranted(category: string) {
    return this._isUniversalParticipationGranted.sendKeys(category);
  }

  isKleuterToeslagGranted(category: string) {
    return this._isKleuterToeslagGranted.sendKeys(category);
  }

  isZorgToeslagGranted(category: string) {
    return this._isZorgToeslagGranted.sendKeys(category);
  }

  getTotal(type)  {
    return element(by.id('calculation.' + type)).getText();
  }

}
