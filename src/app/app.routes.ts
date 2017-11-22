import {Routes} from '@angular/router';
import {routes as topicsRoutes} from './topics/topics.routes';
import {NoContentComponent} from './no-content';


export const ROUTES: Routes = [
  {path: '', children: topicsRoutes},
  {path: '**', component: NoContentComponent},
];
