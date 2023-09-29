import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { Observable } from 'rxjs';
import { Vessel } from './models/vessel.models';
import { VesselFacade } from './services/vessel.facade';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule, MenubarModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {

  items: MenuItem[] = [
    {
      label: 'Vessels',
      routerLink: 'vessels'
    },
    {
      label: 'Emissions',
      routerLink: 'emissions'
    }
  ];

  vessels$!: Observable<Vessel[]>;

  constructor(private vesselFacade: VesselFacade) {}

  ngOnInit(): void {
    this.vesselFacade.load();

    this.vessels$ = this.vesselFacade.allVessel$;

  }


}
