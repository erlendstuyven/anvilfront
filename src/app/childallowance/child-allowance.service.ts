import { Injectable } from '@angular/core';
import {ChildAllowance} from "./childallowance";
import {Http} from "@angular/http";
import {Observable} from "rxjs";
import {ChildAllowances} from "./childallowances";
import 'rxjs/add/operator/map';

@Injectable()
export class ChildAllowanceService {

  constructor(private http: Http) { }

  getChildAllowance = () : Observable<ChildAllowances> => {
    return this.http
      .post('api/calculation')
      .map(httpResponse => {
        let childAllowances = new ChildAllowances();
        childAllowances.childAllowances = [];

        httpResponse.json().childAllowances.forEach( childAllowanceJson => {
          childAllowances.childAllowances.push(new ChildAllowance(childAllowanceJson.amount, childAllowanceJson.inss));
        });

        return childAllowances;
      });
  }

}
//      .get('https://api.myjson.com/bins/m5ict')
