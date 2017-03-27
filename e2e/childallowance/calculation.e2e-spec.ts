///<reference path="../../node_modules/@types/selenium-webdriver/index.d.ts"/>
import {CalculationPage} from "./calculation.po";
import {Allowance} from "../../src/app/calculation/allowance";
import {Entitlement} from "../../src/app/calculation/entitlement";
import {Category} from "../../src/app/calculation/category";
import {browser, element, by} from "protractor";

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

  it('should be able to select all allowances and return the correct result', () => {

    let newVar = {
      allowances: [
        new Allowance('BASIS', 160, new Category('cat1', 'basisbedrag')),
        new Allowance('ZORG_PLEEG', 61.79, new Category('cat1', 'pleegzorgtoeslag')),
        new Allowance('ZORG_WEES', 80, new Category('cat1', 'wezentoeslag 50%')),
        new Allowance('SOCIAAL', 50, new Category('cat1', 'sociale toeslag, laag inkomen, max 2 kids')),
        new Allowance('PARTICIPATIE_UNIVERSEEL', 20, new Category('cat1', 'universele participatie 0_2')),
        new Allowance('KINDEROPVANG', 31.7, new Category('cat1', 'kinderopvangtoeslag')),
        new Allowance('KLEUTER', 150, new Category('cat1', 'kleutertoeslag 3 jaar'))

      ]
    };

    let request = {
      year: 2019,
      month: 2,
      entitlements: [
        new Entitlement('BASIS', 'cat1'),
        new Entitlement('ZORG_PLEEG', 'cat1'),
        new Entitlement('ZORG_WEES', 'cat1'),
        new Entitlement('SOCIAAL', 'cat1'),
        new Entitlement('PARTICIPATIE_UNIVERSEEL', 'cat1'),
        new Entitlement('KINDEROPVANG', 'cat1', 10),
        new Entitlement('KLEUTER', 'cat1')
      ]
    };

    mockServerClient("localhost", 1080).mockAnyResponse(
      {
        'httpRequest': {
          'method': 'POST',
          'path': '/api/calculation',
          'body': JSON.stringify(request)
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
    page.isBasicAllowanceGranted.click();
    page.isFosterCareAllowanceGranted.click();
    page.isOrphanCareAllowanceGranted('wezentoeslag 50%');
    page.isSocialAllowanceGranted('sociale toeslag, laag inkomen, max 2 kids');
    page.isUniversalParticipationGranted('universele participatie 0_2');
    page.isDayCareAllowanceGranted.click();
    page.setDayCareDays(10);
    page.isKleuterToeslagGranted('kleutertoeslag 3 jaar');
    page.calculate();

    // setTimeout function added because daycare implementation causes test to fail. Expectation doesn't wait for the response which takes longer then normal.
    setTimeout(function () {

      expect(page.getAllowanceValue('BASIS')).toEqual('160');
      expect(page.getAllowanceValue('ZORG_PLEEG')).toEqual('61.79');
      expect(page.getAllowanceValue('ZORG_WEES')).toEqual('80');
      expect(page.getAllowanceValue('SOCIAAL')).toEqual('50');
      expect(page.getAllowanceValue('PARTICIPATIE_UNIVERSEEL')).toEqual('20');
      expect(page.getAllowanceValue('KINDEROPVANG')).toEqual('31.7');
      expect(page.getAllowanceValue('KLEUTER')).toEqual('150');
    }, 5000);

  });

});
