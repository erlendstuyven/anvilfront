import { browser, element, by } from 'protractor';

export class CalculationUiPocPage {
  navigateTo() {
    return browser.get('/');
  }

  getTitleText() {
    return element(by.id('newRegimeTitle')).getText();
  }
}
