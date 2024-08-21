import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FleetDashboardPage } from './fleet-dashboard.page';

describe('FleetDashboardPage', () => {
  let component: FleetDashboardPage;
  let fixture: ComponentFixture<FleetDashboardPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FleetDashboardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
