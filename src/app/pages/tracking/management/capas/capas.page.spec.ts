import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CapasPage } from './capas.page';

describe('CapasPage', () => {
  let component: CapasPage;
  let fixture: ComponentFixture<CapasPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CapasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
