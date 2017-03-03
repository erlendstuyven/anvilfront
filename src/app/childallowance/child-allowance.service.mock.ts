import {Observable} from "rxjs";
import {ChildAllowances} from "./childallowances";

export class ChildAllowanceServiceMock {

  params: any;

  childAllowances: ChildAllowances;

  getChildAllowance = (year, month) : Observable<ChildAllowances> => {
      this.params = {year : year, month : month};
      return Observable.of(this.childAllowances);
  }

}
