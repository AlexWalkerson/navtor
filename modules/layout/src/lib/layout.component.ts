import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Data, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { PanelModule } from 'primeng/panel';
import { filter, map } from 'rxjs';
import { NavigationComponent } from './navigation/navigation.component';

@Component({
  selector: 'lib-layout',
  standalone: true,
  imports: [CommonModule, PanelModule, NavigationComponent, RouterOutlet],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private destroyRef = inject(DestroyRef)
  title = '';

  ngOnInit(): void {
    this.title = this.getRouteData()['title'];

    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map(() => this.getRouteData()),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe((data) => {
      this.title = data['title'];
    });
  }

  getRouteData(): Data {
    let route = this.route;
    let data: Data = {};
    while (route.firstChild) {
      route = route.firstChild;
    }
    if (route.snapshot.data) {
      data = route.snapshot.data;
    }
    return data;
  }
}
