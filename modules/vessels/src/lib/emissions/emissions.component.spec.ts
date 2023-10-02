import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { EmissionsChartComponent } from '../emissions-chart/emissions-chart.component';
import { DropdownModule } from 'primeng/dropdown';
import { EmissionsFacade } from '../services/emissions.facade';
import { VesselFacade } from '../services/vessel.facade';
import { EmissionsComponent } from './emissions.component';

describe('EmissionsComponent', () => {
  let component: EmissionsComponent;
  let fixture: ComponentFixture<EmissionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmissionsComponent, DropdownModule, EmissionsChartComponent],
      providers: [provideMockStore({}), VesselFacade, EmissionsFacade],
    }).compileComponents();

    fixture = TestBed.createComponent(EmissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
