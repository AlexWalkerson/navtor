import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadChildren: () => import('modules/layout/src/lib/lib.routes')
  }
];
