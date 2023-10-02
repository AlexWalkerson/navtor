import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { filter, withLatestFrom } from 'rxjs';
import { EmissionsChartComponent } from '../emissions-chart/emissions-chart.component';
import { Vessel } from '../models/vessel.models';
import { EmissionsFacade } from '../services/emissions.facade';
import { VesselFacade } from '../services/vessel.facade';

@Component({
  selector: 'lib-emissions',
  standalone: true,
  imports: [CommonModule, DropdownModule, ReactiveFormsModule, EmissionsChartComponent],
  templateUrl: './emissions.component.html',
  styleUrls: ['./emissions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmissionsComponent implements OnInit {
  vesselFacade = inject(VesselFacade);
  emissionsFacade = inject(EmissionsFacade);
  selectedEmission$ = this.emissionsFacade.selectedEmission$;
  vesselControl = new FormControl<Vessel | null>(null);
  vessels: Vessel[] = [];
  selectedVessel!: Vessel;
  private destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.vesselFacade.loadOnce();
    this.emissionsFacade.loadOnce();

    this.vesselControl.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(val => {
      val && this.vesselFacade.select(val.id);
    });

    this.vesselFacade.allVessel$.pipe(
      filter(e => !!e),
      withLatestFrom(this.vesselFacade.selectedVessel$),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(([vessels, selected]) => {
      this.vessels = vessels;
      this.selectedVessel = selected ?? this.vessels[0];
      this.vesselControl.setValue(this.selectedVessel);
    });

    this.vesselFacade.selectedVessel$.pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(vessel => {
      this.selectedVessel = vessel ?? this.vessels[0];
    });
  }

}
