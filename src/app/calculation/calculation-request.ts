export class CalculationRequest {

  month: string;
  entitlements: string[];

  constructor(month: string, entitlements: string[]) {
    this.entitlements = entitlements;
    this.month = month;
  }


}
