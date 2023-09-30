import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Panel, PanelModule } from 'primeng/panel';
import { VesselsComponent } from './vessels.component';

describe('VesselsComponent', () => {
  let component: VesselsComponent;
  let fixture: ComponentFixture<VesselsComponent>;

  beforeEach(async () => {
    TestBed.overrideComponent(Panel, {set: {styles: ['']}}); // fix Error: Could not parse CSS stylesheet
    await TestBed.configureTestingModule({
      imports: [VesselsComponent, PanelModule, BrowserAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(VesselsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
