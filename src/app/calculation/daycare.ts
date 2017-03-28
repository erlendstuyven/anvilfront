import {Entitlement} from './entitlement'

export class DayCare extends Entitlement {

  constructor(public type: string, public category: string, public numberOfDays: number, public beneficiary?: string ) {
    super(type, category, beneficiary);
    this.numberOfDays = numberOfDays;
  }
}
