import {Route} from '@angular/router';
import { ContentMainComponent } from "./content.component";
import { DetailComponent } from './pages/detail.component';

export const CONTENT_ROUTES: Route[] = [
  {path: '',
    children: [
      { path: '', component: ContentMainComponent},
     { path: ':url', component: DetailComponent}
    ]},
];


