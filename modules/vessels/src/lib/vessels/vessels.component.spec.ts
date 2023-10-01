import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideMockStore } from '@ngrx/store/testing';
import { VesselsComponent } from './vessels.component';
import { VesselFacade } from '../services/vessel.facade';

describe('VesselsComponent', () => {
  let component: VesselsComponent;
  let fixture: ComponentFixture<VesselsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VesselsComponent, BrowserAnimationsModule],
      providers: [provideMockStore({}), VesselFacade]
    }).compileComponents();

    fixture = TestBed.createComponent(VesselsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
