import {Routes} from '@angular/router';
import {SportHorses} from "./items/sport-horses/sport-horses.component";
import {SaleHorses} from "./items/sale-horses/sale-horses.component";
import {Home} from "./home/home.component";

export const routes: Routes = [
  {
    path: '',
    component: Home
  },
  {
    path: 'home',
    component: Home

  }, {
    path: 'sportHorses',
    component: SportHorses

  },
  {
    path: 'saleHorses',
    component: SaleHorses
  }
];
