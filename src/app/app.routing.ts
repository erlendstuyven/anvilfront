import {Routes} from '@angular/router';
import {SportHorses} from "./items/sport-horses/sport-horses.component";
import {SaleHorses} from "./items/sale-horses/sale-horses.component";
import {Home} from "./home/home.component";
import {Information} from "./items/information/information.component";
import {Newsletter} from "./items/newsletter/news-letter.component";

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
  },
  {
    path: 'information',
    component: Information
  },
  {
    path: 'newsletter',
    component: Newsletter
  }
];
