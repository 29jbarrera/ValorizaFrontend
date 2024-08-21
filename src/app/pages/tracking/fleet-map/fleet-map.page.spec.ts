import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FleetMapPage } from './fleet-map.page';

describe('FleetMapPage', () => {
  let component: FleetMapPage;
  let fixture: ComponentFixture<FleetMapPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FleetMapPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
