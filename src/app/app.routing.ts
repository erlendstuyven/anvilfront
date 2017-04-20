import {Routes} from '@angular/router';
import {NewRegimeComponent} from 'app/regimes/new-regime/new-regime.component';
import {TransitionRegimeComponent} from './regimes/transition-regime/transition-regime.component';

export const routes: Routes = [
  {
    path: '',
    component: NewRegimeComponent
  },
  {
    path: 'newRegime',
    component: NewRegimeComponent,

  },
  {
    path: 'transitionRegime',
    component: TransitionRegimeComponent
  }
];
