import {Observable} from "rxjs";
import {ChildAllowances} from "./childallowances";

export class ChildAllowanceServiceMock {

  childAllowances: ChildAllowances;

  getChildAllowance = () : Observable<ChildAllowances> => {
      return Observable.of(this.childAllowances);
  }

}
