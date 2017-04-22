import {Routes} from '@angular/router';
import {SportHorses} from "./regimes/sport-horses/sport-horses.component";
import {SaleHorses} from "./regimes/sale-horses/sale-horses.component";

export const routes: Routes = [
  {
    path: '',
    component: SportHorses
  },
  {
    path: 'sportHorses',
    component: SportHorses,

  },
  {
    path: 'saleHorses',
    component: SaleHorses
  }
];
