import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardViajesPage } from './dashboard-viajes.page';

describe('DashboardViajesPage', () => {
  let component: DashboardViajesPage;
  let fixture: ComponentFixture<DashboardViajesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardViajesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
