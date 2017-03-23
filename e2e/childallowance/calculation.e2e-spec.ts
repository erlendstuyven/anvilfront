import {CalculationPage} from "./calculation.po";
import {element} from "protractor";
import {Allowance} from "../../src/app/calculation/allowance";
import {Calculation} from "../../src/app/calculation/calculation";
import {Entitlement} from "../../src/app/calculation/entitlement";
import {Category} from "../../src/app/calculation/category";

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
        new Allowance('BASIC', 160, new Category('cat1', 'basic')),
        new Allowance('CARE_FOSTER', 61.79, new Category('cat1', 'pleeg')),
        new Allowance('CARE_ORPHAN', 80, new Category('cat1', 'Halve wees')),
        new Allowance('SOCIAL', 50, new Category('cat1', 'sociaal'))
      ]
    };

    let request = {
      year: 2019,
      month : 2,
      entitlements : [
        new Entitlement('BASIC', 'cat1'),
        new Entitlement('CARE_FOSTER', 'cat1'),
        new Entitlement('CARE_ORPHAN', 'cat1'),
        new Entitlement('SOCIAL', 'cat1')
      ]
    };

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
    page.isOrphanCareAllowanceGranted('halve wees');
    page.isSocialAllowanceGranted('sociaal');
    page.calculate();

    expect(page.getAllowanceValue('BASIC')).toEqual('160');
    expect(page.getAllowanceValue('CARE_FOSTER')).toEqual('61.79');
    expect(page.getAllowanceValue('CARE_ORPHAN')).toEqual('80');
    expect(page.getAllowanceValue('SOCIAL')).toEqual('50');
  });

});
