import {CalculationPage} from "./calculation.po";
import {element} from "protractor";
import {Allowance} from "../../src/app/calculation/allowance";
import {Calculation} from "../../src/app/calculation/calculation";
/*
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

    page.navigateTo();

    page.setYear(2019);
    page.setMonth(2);
    page.isFosterCareAllowanceGranted.click();
    page.isBasicAllowanceGranted.click();

    let newVar = {
      calculation: []};

    if(page.isBasicAllowanceGranted.isSelected()) {
      newVar.calculation.push(new Allowance('BASIC', 160));
    } else {
      newVar.calculation.push(new Allowance('BASIC', 0));
    }

    if(page.isFosterCareAllowanceGranted.isSelected() && page.isBasicAllowanceGranted.isSelected()) {
      newVar.calculation.push(new Allowance('FOSTERCARE', 61.79));
    } else {
      newVar.calculation.push(new Allowance('FOSTERCARE', 0));
    }

    mockServerClient("localhost", 1080).mockAnyResponse(
      {
        'httpRequest': {
          'method': 'POST',
          'path': '/api/calculation',
          'queryStringParameters': [
            {
              'name': 'year',
              'values': ['2019']
            },
            {
              'name': 'month',
              'values': ['2']
            },
          ]
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



    expect(page.getCalculation(0))
      .toEqual([new Allowance('BASIC', 160),
        new Allowance('FOSTERCARE', 61.79)]);

  });

  it('should be able to select \'recht op basisbedrag\' and not select \'recht op pleegzorg\' and return a result', () => {

    page.navigateTo();

    page.setYear(2019);
    page.setMonth(2);
    page.isBasicAllowanceGranted.click();

    let newVar = {
      calculation: []};

    if(page.isBasicAllowanceGranted.isSelected()) {
      newVar.calculation.push(new Allowance('BASIC', 160));
    } else {
      newVar.calculation.push(new Allowance('BASIC', 0));
    }

    if(page.isFosterCareAllowanceGranted.isSelected() && page.isBasicAllowanceGranted.isSelected()) {
      newVar.calculation.push(new Allowance('FOSTERCARE', 61.79));
    } else {
      newVar.calculation.push(new Allowance('FOSTERCARE', 0));
    }

    mockServerClient("localhost", 1080).mockAnyResponse(
      {
        'httpRequest': {
          'method': 'POST',
          'path': '/api/calculation',
          'queryStringParameters': [
            {
              'name': 'year',
              'values': ['2019']
            },
            {
              'name': 'month',
              'values': ['2']
            },
          ]
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

    expect(page.getCalculation(0))
      .toEqual([new Allowance('BASIC', 160),
        new Allowance('FOSTERCARE', 0)]);


  });

  it('should be able to not select \'recht op basisbedrag\' and not select \'recht op pleegzorg\' and return a result', () => {

    page.navigateTo();

    page.setYear(2019);
    page.setMonth(2);

    let newVar = {
      calculation: []};

    if(page.isBasicAllowanceGranted.isSelected()) {
      newVar.calculation.push(new Allowance('BASIC', 160));
    } else {
      newVar.calculation.push(new Allowance('BASIC', 0));
    }

    if(page.isFosterCareAllowanceGranted.isSelected() && page.isBasicAllowanceGranted.isSelected()) {
      newVar.calculation.push(new Allowance('FOSTERCARE', 61.79));
    } else {
      newVar.calculation.push(new Allowance('FOSTERCARE', 0));
    }

    mockServerClient("localhost", 1080).mockAnyResponse(
      {
        'httpRequest': {
          'method': 'POST',
          'path': '/api/calculation',
          'queryStringParameters': [
            {
              'name': 'year',
              'values': ['2019']
            },
            {
              'name': 'month',
              'values': ['2']
            },
          ]
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

    expect(page.getCalculation(0))
      .toEqual([new Allowance('BASIC', 0),
        new Allowance('FOSTERCARE', 0)]);
  });

});
*/
