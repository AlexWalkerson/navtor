import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AgGridModule } from 'ag-grid-angular';
import { ColDef, FirstDataRenderedEvent, GridSizeChangedEvent } from 'ag-grid-community';
import { Vessel } from '../models/vessel.models';
import { VesselFacade } from '../services/vessel.facade';
import * as vesselSelectors from '../state/vessel/vessel.selectors';

@Component({
  selector: 'lib-vessels',
  standalone: true,
  imports: [CommonModule, AgGridModule],
  templateUrl: './vessels.component.html',
  styleUrls: ['./vessels.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VesselsComponent implements OnInit {
  private readonly store = inject(Store);
  private readonly vesselFacade = inject(VesselFacade);
  public rowData$ = this.store.pipe(select(vesselSelectors.selectAllVessel));

  // Each Column Definition results in one Column.
  public columnDefs: ColDef[] = [
    { field: 'name' },
    { field: 'mmsi' },
    { field: 'imo' },
    { field: 'companyName', headerName: 'Company Name' },
    { field: 'vesselType', headerName: 'Vessel Type' }
  ];

  onFirstDataRendered(params: FirstDataRenderedEvent<Vessel>) {
    params.api.sizeColumnsToFit();
  }

  onGridSizeChanged(params: GridSizeChangedEvent<Vessel>) {
    params.api.sizeColumnsToFit();
  }

  ngOnInit(): void {
    this.vesselFacade.loadOnce();
  }
}
