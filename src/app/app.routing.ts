import {Routes} from '@angular/router';
import {SportHorses} from "./concepts/sport-horses/sport-horses.component";
import {SaleHorses} from "./concepts/sale-horses/sale-horses.component";
import {Home} from "./home/home.component";
import {Information} from "./concepts/information/information.component";
import {Newsletter} from "./concepts/newsletter/news-letter.component";

export const routes: Routes = [
  {
    path: '',
    component: Home
  },
  {
    path: 'home',
    component: Home
  },
  {
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
