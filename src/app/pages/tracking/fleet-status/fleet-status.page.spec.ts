import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FleetStatusPage } from './fleet-status.page';

describe('FleetStatusPage', () => {
  let component: FleetStatusPage;
  let fixture: ComponentFixture<FleetStatusPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FleetStatusPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
