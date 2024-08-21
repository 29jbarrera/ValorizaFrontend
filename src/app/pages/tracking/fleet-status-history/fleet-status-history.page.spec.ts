import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FleetStatusHistoryPage } from './fleet-status-history.page';

describe('FleetStatusHistoryPage', () => {
  let component: FleetStatusHistoryPage;
  let fixture: ComponentFixture<FleetStatusHistoryPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FleetStatusHistoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
