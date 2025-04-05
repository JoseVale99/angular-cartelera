import {Route} from '@angular/router';
import { ContentMainComponent } from "./content.component";

export const CONTENT_ROUTES: Route[] = [
  {path: '',
    children: [
      { path: '', component: ContentMainComponent},
     // { path: ':url', component: DetailComponent}
    ]},
];


