import {Category} from "./category";
import {Observable} from "rxjs";
export class Allowance {

  constructor(public type: string, public value: number, public category?: Category, public beneficiary?: string) {}

}
