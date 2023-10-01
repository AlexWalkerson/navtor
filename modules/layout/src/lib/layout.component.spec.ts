import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute, Data } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { PanelModule } from 'primeng/panel';
import { LayoutComponent } from './layout.component';
import { NavigationComponent } from './navigation/navigation.component';

describe('LayoutComponent', () => {
  let component: LayoutComponent;
  let fixture: ComponentFixture<LayoutComponent>;

  // Mock ActivatedRoute, Router, and DestroyRef
  const mockActivatedRoute = {
    snapshot: {
      data: {
        title: 'Mock Title'
      }
    },
    firstChild: null
  };


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayoutComponent, RouterTestingModule, PanelModule, NavigationComponent, NoopAnimationsModule],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set the title from route data on initialization', () => {
    expect(component.title).toBe('Mock Title');
  });

  it('should return route data from getRouteData() method', () => {
    const routeData: Data = component.getRouteData();
    expect(routeData['title']).toBe('Mock Title');
  });

});
