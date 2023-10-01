import { Route } from '@angular/router';
import { LayoutComponent } from './layout.component';

export default [
  {
    path: '', component: LayoutComponent,
    children: [
      {
        path: '',
        loadComponent: () => import('modules/vessels').then(m => m.VesselsComponent),
        data: {title: 'Vessels'}
      },
      {
        path: 'vessels',
        loadComponent: () => import('modules/vessels').then(m => m.VesselsComponent),
        data: {title: 'Vessels'}
      },
      {
        path: 'emissions',
        loadChildren: () => import('modules/emissions/src/lib/lib.routes'),
        data: {title: 'Emissions'}
      }
    ]
  }
] satisfies Route[];
