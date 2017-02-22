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
    let newVar = {calculations:[{total:160, inss:1234},{total:100, inss:1111},{total:200, inss:2222},{total:115, inss:3333}]};

    mockServerClient('localhost', 1080).mockSimpleResponse('/api/calculation', newVar, 200);

    page.navigateTo();
    page.calculate();

    expect(page.getAmount(0)).toEqual('160');
    expect(page.getAmount(1)).toEqual('100');
    expect(page.getAmount(2)).toEqual('200');
    expect(page.getAmount(3)).toEqual('115');
    expect(page.getInss(0)).toEqual('1234');
    expect(page.getInss(1)).toEqual('1111');
    expect(page.getInss(2)).toEqual('2222');
    expect(page.getInss(3)).toEqual('3333');
  });

});