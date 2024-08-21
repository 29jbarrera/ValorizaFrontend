import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FamiliaSacyrparkPage } from './familia-sacyrpark.page';

describe('FamiliaSacyrparkPage', () => {
  let component: FamiliaSacyrparkPage;
  let fixture: ComponentFixture<FamiliaSacyrparkPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FamiliaSacyrparkPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
