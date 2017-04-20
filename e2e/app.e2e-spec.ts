import { CalculationUiPocPage } from './app.po';

describe('calculation-ui-poc App', () => {
  let page: CalculationUiPocPage;

  beforeEach(() => {
    page = new CalculationUiPocPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getTitleText()).toEqual('Nieuw Regime');
  });
});
