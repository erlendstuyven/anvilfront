import { Injectable } from '@angular/core';
import {Http} from "@angular/http";
import 'rxjs/add/operator/map';

@Injectable()
export class RestConnectorService {

  constructor(private _http: Http) {}

  public getHorseInformation() {
     return this._http.get('/api/horses/information')
       .map(res => res.json());
  }

}
