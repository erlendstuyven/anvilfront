import {Entitlement} from "./entitlement";

export class CalculationRequest {

  constructor(public year: number, public month: number, public entitlements: Entitlement[]) {}

}
