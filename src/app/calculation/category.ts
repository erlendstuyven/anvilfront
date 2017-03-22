export class Category {

  constructor(public name: string, public description: string) {}

  getName(): string  {
    return this.name;
  }

  getDescription(): string {
    return this.description;
  }

}
