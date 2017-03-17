import {CalculationPage} from "./calculation.po";
import {element} from "protractor";
import {Allowance} from "../../src/app/calculation/allowance";
import {Calculation} from "../../src/app/calculation/calculation";
import {Entitlement} from "../../src/app/calculation/entitlement";

var mockserver = require('mockserver-grunt');
var mockServerClient = require('mockserver-client').mockServerClient;

describe('File Form Page', function () {
  let page: CalculationPage;

  beforeAll((done) => {
    mockserver.start_mockserver({serverPort: 1080}).then(done);
  });

  beforeEach(() => {
    page = new CalculationPage();
  });

  afterAll((done) => {
    mockserver.stop_mockserver({serverPort: 1080}).then(done);
  });

  it('should be able to select \'recht op basisbedrag\' and \'recht op pleegzorg\' and return a result', () => {

    let newVar = {
      allowances: [
        new Allowance('BASIC', 160),
        new Allowance('FOSTERCARE', 61.79)
      ]
    };

    let request = {
      month : '2019-02',
      entitlements : [
        new Entitlement('BASIC'),
        new Entitlement('FOSTERCARE')
      ]
    }

    mockServerClient("localhost", 1080).mockAnyResponse(
      {
        'httpRequest': {
          'method': 'POST',
          'path': '/api/calculation',
          'body' : JSON.stringify(request)
        },
        'httpResponse': {
          'statusCode': 200,
          'body': JSON.stringify(newVar)
        },
        'times': {
          'remainingTimes': 1,
          'unlimited': false
        }
      }
    );

    page.navigateTo();

    page.setYear(2019);
    page.setMonth(2);
    page.isFosterCareAllowanceGranted.click();
    page.isBasicAllowanceGranted.click();
    page.calculate();

    expect(page.getAllowanceValue('BASIC')).toEqual('160');
    expect(page.getAllowanceValue('FOSTERCARE')).toEqual('61.79');
  });

});
