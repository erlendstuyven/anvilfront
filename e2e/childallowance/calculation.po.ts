import {browser, element, by} from 'protractor';

export class CalculationPage {

  private calculateButton = element(by.id('calculateButton'));
  private yearInput = element(by.id('year'));
  private monthInput = element(by.id('month'));

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

  getAmount(index) {
    return element(by.id('total' + index)).getText();
  }

  getInss(index) {
    return element(by.id('inss' + index)).getText();
  }

}
