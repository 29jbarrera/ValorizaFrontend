import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TimeDashboardPage } from './time-dashboard.page';

describe('TimeDashboardPage', () => {
  let component: TimeDashboardPage;
  let fixture: ComponentFixture<TimeDashboardPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeDashboardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
