import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'anvil-menu',
  template: `
      <ul>
      <li>
        <a [routerLinkActive]="['active']" [routerLink]="['/home']">Home</a>
      </li>
      <li>
        <a [routerLinkActive]="['active']" [routerLink]="['/sportHorses']">Sport horses</a>
      </li>
      <li>
        <a [routerLinkActive]="['active']" [routerLink]="['/saleHorses']">Horses for sale</a>
      </li>
      <li>
        <a [routerLinkActive]="['active']" [routerLink]="['/information']">Information</a>
      </li>
     <li>
        <a [routerLinkActive]="['active']" [routerLink]="['/newsletter']">Newsletter</a>
      </li>
    </ul>
  `,
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  constructor() { }
}
