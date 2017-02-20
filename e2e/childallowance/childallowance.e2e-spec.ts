import {ChildAllowancePage} from "./childallowance.po";

var mockserver = require('mockserver-grunt');
var mockServerClient = require('mockserver-client').mockServerClient;

describe('File Form Page', function () {
  let page: ChildAllowancePage;

  beforeAll((done) => {
    mockserver.start_mockserver({serverPort: 1080}).then(done);
  });

  beforeEach(() => {
    page = new ChildAllowancePage();
  });

  afterAll((done) => {
    mockserver.stop_mockserver({serverPort: 1080}).then(done);
  });

  it('should be able to enter inss', () => {
    let newVar = {childAllowances:[{amount:160},{amount:100},{amount:200},{amount:115}]};

    mockServerClient('localhost', 1080).mockSimpleResponse('/api/child-allowance', newVar, 200);

    page.navigateTo();
    page.calculate();

    expect(page.getAmount(0)).toEqual('160');
    expect(page.getAmount(1)).toEqual('100');
    expect(page.getAmount(2)).toEqual('200');
    expect(page.getAmount(3)).toEqual('115');
  });

});
