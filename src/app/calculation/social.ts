import {Entitlement} from './entitlement'

export class Social extends Entitlement {

  constructor(public type: string, public category: string, public housingShare?: number, public beneficiary?: string ) {
    super(type, category, beneficiary);
    this.housingShare = housingShare
  }
}
