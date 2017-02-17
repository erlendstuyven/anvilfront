import { CalculationUiPage } from './app.po';

describe('calculation-ui App', function() {
  let page: CalculationUiPage;

  beforeEach(() => {
    page = new CalculationUiPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
