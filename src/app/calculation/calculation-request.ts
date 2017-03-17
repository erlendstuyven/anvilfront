import {Entitlement} from "./entitlement";

export class CalculationRequest {

  constructor(public month: string, public entitlements: Entitlement[]) {}

}
