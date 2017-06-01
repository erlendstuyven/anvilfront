import { Injectable } from '@angular/core';
import {Http} from "@angular/http";
import 'rxjs/add/operator/map';
import {HorseInformation} from "./items/sale-horses/horse-information";
import {Observable} from "rxjs";

@Injectable()
export class RestConnectorService {

  constructor(private _http: Http) {}

  public getHorseName() {
     return this._http.get('/api/horses/name');
  }

  public getHorseInformation = () => {
    return this._http
      .get('api/horses/information')
      .map(httpResponse => {
        console.log(JSON.parse(httpResponse.text()) + '********************');
      });
  }

  // public getChildAllowance = () : Observable<ChildAllowances> => {
  //   return this.http
  //     .post('api/calculation')
  //     .map(httpResponse => {
  //       let childAllowances = new ChildAllowances();
  //       childAllowances.childAllowances = [];
  //
  //       httpResponse.json().childAllowances.forEach( childAllowanceJson => {
  //         childAllowances.childAllowances.push(new ChildAllowance(childAllowanceJson.amount));
  //       });
  //
  //       return childAllowances;
  //     });
  // }

}
