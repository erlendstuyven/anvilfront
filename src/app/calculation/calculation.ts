import {Allowance} from "./allowance";
export class Calculation {


  constructor(public year: number, public month: number, public timestamp: string, public allowances: Allowance[], public total: number) {}

}
