import {browser, element, by} from 'protractor';

export class ChildAllowancePage {

  private calculateButton = element(by.id('calculateButton'));

  navigateTo() {
    return browser.get('/');
  }

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
