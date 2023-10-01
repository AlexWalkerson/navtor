import { Route } from '@angular/router';
import { LayoutComponent } from './layout.component';

export default [
  {
    path: '',
    component: LayoutComponent,
    loadChildren: () => import('modules/vessels/src/lib/lib.routes'),
  }
] satisfies Route[];
