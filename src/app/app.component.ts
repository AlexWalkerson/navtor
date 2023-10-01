import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenubarModule } from 'primeng/menubar';
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
  constructor(private vesselFacade: VesselFacade) {}

  ngOnInit(): void {
    this.vesselFacade.load();
  }


}
