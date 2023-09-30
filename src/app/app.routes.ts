import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadComponent: () => import('modules/vessels').then(m => m.VesselsComponent)
  },
  {
    path: 'vessels',
    loadComponent: () => import('modules/vessels').then(m => m.VesselsComponent)
  },
  {
    path: 'emissions',
    loadChildren: () => import('modules/emissions/src/lib/lib.routes')
  }
];
